#include <WiFi.h>
#include <WiFiClient.h>

// WiFi network credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const char* API_KEY = "kakdila_kakdila";

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
  bool isAuth = 0;
  bool isPostRequest = request.indexOf("POST") == 0;
  bool isValidRoute = request.indexOf("/open-gate") > 0;
  bool hasValidApiKey = request.indexOf("key=" + String(API_KEY)) > 0;
  
  // Handle the request
  if (isPostRequest && isValidRoute && hasValidApiKey) {
    // Activate the gate
    isAuth = 1;
    Serial.println("Opening gate - valid request received");
    digitalWrite(GATE_CONTROL_PIN, HIGH);
    delay(2000);
    digitalWrite(GATE_CONTROL_PIN, LOW);
    
    // Send HTTP response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Connection: close");
    client.println();
    client.println("{\"status\":\"success\",\"message\":\"Gate opened successfully\"}");
  } else {
    String errorReason = "Unknown error";
    if (!isPostRequest) {
      errorReason = "Method not allowed";
    } else if (!isValidRoute) {
      errorReason = "Invalid route";
    } else if (!hasValidApiKey) {
      errorReason = "Invalid or missing API key";
    }
    
    // Send 403 Forbidden for invalid requests
    client.println("HTTP/1.1 403 Forbidden");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Connection: close");
    client.println();
    client.println("{\"status\":\"error\",\"message\":\"" + errorReason + "\"}");
    
    Serial.print("Request denied: ");
    Serial.println(errorReason);
  }

  // Give the web browser time to receive the data
  delay(10);

  // Close the connection
  client.stop();
  Serial.println("Client disconnected");
  if (isAuth) {
    digitalWrite(GATE_CONTROL_PIN, LOW);
    delay(500);
    digitalWrite(GATE_CONTROL_PIN, HIGH);
    delay(2000);
    digitalWrite(GATE_CONTROL_PIN, LOW);
    delay(500);
    digitalWrite(GATE_CONTROL_PIN, HIGH);
    delay(2000);
    digitalWrite(GATE_CONTROL_PIN, LOW);
  }
} 