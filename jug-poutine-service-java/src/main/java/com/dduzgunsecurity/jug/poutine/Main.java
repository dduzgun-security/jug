package com.dduzgunsecurity.jug.poutine;

import com.rating.poutine.v1.Poutine;
import com.rating.poutine.v1.PoutineRequest;
import com.rating.poutine.v1.PoutineResponse;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import com.google.protobuf.util.JsonFormat;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class Main {
    private static final int PORT = getPort();

    public static void main(String[] args) throws IOException {
        // Initialize protobuf classes early to avoid lazy initialization deadlock
        Poutine.getDefaultInstance();
        PoutineRequest.getDefaultInstance();
        PoutineResponse.getDefaultInstance();

        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        server.createContext("/poutine", Main::handlePoutineRequest);

        server.setExecutor(null); // creates a default executor
        server.start();

        System.out.println("Jug Poutine Service running on port " + PORT);
    }

    private static void handlePoutineRequest(HttpExchange exchange) throws IOException {
        // Set CORS headers
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        // Handle OPTIONS request for CORS preflight
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        // Only accept POST requests
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendErrorResponse(exchange, 405, "Method not allowed");
            return;
        }

        try {
            // Read request body
            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);

            // Parse JSON directly into Poutine protobuf using protobuf's JsonFormat
            Poutine.Builder poutineBuilder = Poutine.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(requestBody, poutineBuilder);
            Poutine poutine = poutineBuilder.build();

            // Create PoutineRequest with the parsed Poutine
            PoutineRequest poutineRequest = PoutineRequest.newBuilder()
                    .setPoutine(poutine)
                    .build();

            System.out.println("Received PoutineRequest: " + poutineRequest);

            // Calculate average score from the three rating fields and round to 1 decimal place
            float averageScore = Math.round((poutine.getCheeseSqueakiness() +
                                 poutine.getGravyThickness() +
                                 poutine.getFriesCrispiness()) / 3.0f * 10.0f) / 10.0f;

            // Create PoutineResponse model
            PoutineResponse poutineResponse = PoutineResponse.newBuilder()
                    .setMessage("Poutine rating received successfully")
                    .setAverageScore(averageScore)
                    .build();

            // Convert response to JSON using protobuf's JsonFormat
            String jsonResponse = JsonFormat.printer().print(poutineResponse);

            // Send response
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            byte[] responseBytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, responseBytes.length);

            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        } catch (Exception e) {
            System.err.println("Error processing poutine request: " + e.getMessage());
            e.printStackTrace();
            sendErrorResponse(exchange, 400, "Invalid poutine request: " + e.getMessage());
        }
    }

    private static void sendErrorResponse(HttpExchange exchange, int statusCode, String message) throws IOException {
        String jsonError = String.format("{\"error\":\"%s\"}", message);
        byte[] errorBytes = jsonError.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, errorBytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(errorBytes);
        }
    }

    private static int getPort() {
        String portStr = System.getenv("PORT");
        return portStr != null ? Integer.parseInt(portStr) : 8001;
    }
}
