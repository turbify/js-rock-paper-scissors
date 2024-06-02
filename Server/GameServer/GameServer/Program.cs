using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    private static TcpListener tcpListener;
    private static List<string> rooms = new List<string>(); // List to store room names
    private static object lockObj = new object();

    static async Task Main(string[] args)
    {
        tcpListener = new TcpListener(IPAddress.Loopback, 5002); // Change the port to 5002 for TCP
        tcpListener.Start();
        Console.WriteLine("TCP Server started on port 5002...");

        // Start the TCP server in a separate thread
        var tcpServerThread = new Thread(TcpServer);
        tcpServerThread.Start();

        // Start the HTTP server
        await HttpServer();
    }

    private static async Task HttpServer()
    {
        var listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:5003/"); // Change the port to 5003 for HTTP
        listener.Start();
        Console.WriteLine("HTTP Server started on port 5003...");

        while (true)
        {
            var context = await listener.GetContextAsync();
            var request = context.Request;
            var response = context.Response;

            // Add CORS headers to allow requests from any origin
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if (request.HttpMethod == "OPTIONS")
            {
                // Preflight request (OPTIONS) received, respond with OK status
                response.StatusCode = 200;
                response.OutputStream.Close();
            }
            else if (request.HttpMethod == "GET" && request.Url.AbsolutePath == "/rooms")
            {
                // Handle GET request to fetch list of rooms
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(rooms);
                var buffer = Encoding.UTF8.GetBytes(json);

                response.ContentType = "application/json";
                response.ContentLength64 = buffer.Length;
                await response.OutputStream.WriteAsync(buffer, 0, buffer.Length);
                response.OutputStream.Close();
            }
            else if (request.HttpMethod == "POST" && (request.Url.AbsolutePath == "/create" || request.Url.AbsolutePath == "/join"))
            {
                string json;
                using (var reader = new System.IO.StreamReader(request.InputStream, request.ContentEncoding))
                {
                    json = await reader.ReadToEndAsync();
                }

                var roomName = Newtonsoft.Json.Linq.JObject.Parse(json)["roomName"].ToString();
                if (request.Url.AbsolutePath == "/create")
                {
                    // Add the room to the list of rooms
                    lock (lockObj)
                    {
                        rooms.Add(roomName);
                    }

                    // Send a response indicating that the room was created successfully
                    var responseMessage = $"Room '{roomName}' created successfully";
                    var buffer = Encoding.UTF8.GetBytes(responseMessage);
                    response.ContentLength64 = buffer.Length;
                    await response.OutputStream.WriteAsync(buffer, 0, buffer.Length);
                    response.OutputStream.Close();
                }
                else
                {
                    // Handle joining the room
                    var tcpResponse = await SendTcpMessage($"JOIN {roomName}");

                    var buffer = Encoding.UTF8.GetBytes(tcpResponse);
                    response.ContentLength64 = buffer.Length;
                    await response.OutputStream.WriteAsync(buffer, 0, buffer.Length);
                    response.OutputStream.Close();
                }
            }
            else
            {
                response.StatusCode = (int)HttpStatusCode.NotFound;
                response.Close();
            }
        }
    }

    private static void TcpServer()
    {
        while (true)
        {
            var client = tcpListener.AcceptTcpClient();
            var thread = new Thread(HandleTcpClient);
            thread.Start(client);
        }
    }

    private static void HandleTcpClient(object obj)
    {
        var client = (TcpClient)obj;
        var stream = client.GetStream();
        var buffer = new byte[1024];
        var bytesRead = stream.Read(buffer, 0, buffer.Length);
        var message = Encoding.UTF8.GetString(buffer, 0, bytesRead);

        var response = ProcessMessage(message);
        var responseBuffer = Encoding.UTF8.GetBytes(response);
        stream.Write(responseBuffer, 0, responseBuffer.Length);
    }

    private static string ProcessMessage(string message)
    {
        var parts = message.Split(' ');
        if (parts.Length < 2)
        {
            return "Invalid command";
        }

        var command = parts[0];
        var roomName = parts[1];

        lock (lockObj)
        {
            switch (command)
            {
                case "CREATE":
                    if (rooms.Contains(roomName))
                    {
                        return "Room already exists";
                    }
                    rooms.Add(roomName);
                    return "Room created";

                case "JOIN":
                    if (!rooms.Contains(roomName))
                    {
                        return "Room does not exist";
                    }
                    // Handle joining the room
                    return $"Joined room {roomName}";

                default:
                    return "Unknown command";
            }
        }
    }

    private static async Task<string> SendTcpMessage(string message)
    {
        using (var client = new TcpClient("localhost", 5002))
        using (var stream = client.GetStream())
        {
            var buffer = Encoding.UTF8.GetBytes(message);
            await stream.WriteAsync(buffer, 0, buffer.Length);

            buffer = new byte[1024];
            var bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
            return Encoding.UTF8.GetString(buffer, 0, bytesRead);
        }
    }
}
