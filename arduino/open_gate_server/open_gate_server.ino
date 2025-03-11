#include <WiFi.h>
#include <WiFiClient.h>

// WiFi network credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Pin configuration
const int GATE_CONTROL_PIN = 2;  // Change this to the pin connected to your gate control relay

// Network configuration
WiFiServer server(8000);  // Port 8000 to match your Next.js application

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  delay(1500);  // Give time for serial to initialize

  // Configure gate control pin as output
  pinMode(GATE_CONTROL_PIN, OUTPUT);
  digitalWrite(GATE_CONTROL_PIN, LOW);  // Ensure gate is closed initially

  // Connect to WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  
  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.print("Use this URL to connect: http://");
  Serial.print(WiFi.localIP());
  Serial.println(":8000/");
}

void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  Serial.println("New client connected");
  
  // Wait for data from client
  unsigned long timeout = millis();
  while (client.connected() && !client.available()) {
    if (millis() - timeout > 1000) {
      Serial.println("Client connection timeout!");
      client.stop();
      return;
    }
  }

  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);

  // Read the rest of the headers
  while (client.available()) {
    client.read();
  }

  bool isPostRequest = request.indexOf("POST") == 0;
  
  // Handle the request
  if (isPostRequest) {
    // Activate the gate
    digitalWrite(GATE_CONTROL_PIN, HIGH);
    delay(1000);  // Keep the signal high for 1 second
    digitalWrite(GATE_CONTROL_PIN, LOW);
    
    // Send HTTP response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Connection: close");
    client.println();
    client.println("{\"status\":\"success\",\"message\":\"Gate opened successfully\"}");
  } else {
    // Send 405 Method Not Allowed for non-POST requests
    client.println("HTTP/1.1 405 Method Not Allowed");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Connection: close");
    client.println();
    client.println("{\"status\":\"error\",\"message\":\"Method not allowed\"}");
  }

  // Give the web browser time to receive the data
  delay(10);

  // Close the connection
  client.stop();
  Serial.println("Client disconnected");
} 