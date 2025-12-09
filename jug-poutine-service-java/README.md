# JUG Poutine Service (Java)

Simple Java REST API service for rating poutines using `com.sun.net.httpserver`.

## Requirements

- Java 25
- Maven

## Run

```bash
mvn compile exec:java -Dexec.mainClass="com.dduzgunsecurity.jug.poutine.Main"
```

Custom port:

```bash
PORT=9000 mvn compile exec:java -Dexec.mainClass="com.dduzgunsecurity.jug.poutine.Main"
```

Default port: 9000

## API Endpoint

### POST /poutine

Rate a poutine.

**Request:**
```json
{
  "restaurant": "La Banquise",
  "cheeseSqueakiness": 5,
  "gravyThickness": 4,
  "friesCrispiness": 5,
  "size": "large",
  "comments": "Amazing poutine!"
}
```

**Response:**
```json
{
  "message": "Poutine rating received successfully",
  "averageScore": 4.67
}
```

## Example

```bash
curl -X POST http://localhost:8001/poutine \
  -H "Content-Type: application/json" \
  -d '{
    "restaurant": "La Banquise",
    "cheeseSqueakiness": 5,
    "gravyThickness": 4,
    "friesCrispiness": 5,
    "size": "large",
    "comments": "Amazing poutine!"
  }'
```
