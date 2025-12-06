# jug

Protocol Buffers for poutine ratings.

## Generate Code

```bash
cd jug-model && buf generate
```

Generates code for:
- **Go** → `jug-model/jug-model-go/` (use direct repo reference)
- **Java** → `jug-model/jug-model-java/` (published to GitHub Packages)
- **JavaScript** → `jug-model/jug-model-js/` (published to GitHub Packages)

## Using the Packages

### Go
```go
import poutinev1 "github.com/dduzgun-security/jug/jug-model/jug-model-go/rating/poutine/v1"
```

### Java
Add to your `pom.xml`:
```xml
<dependency>
    <groupId>com.github.dduzgun-security</groupId>
    <artifactId>jug-model</artifactId>
    <version>1.0.0</version>
</dependency>
```

### JavaScript
```bash
npm install @dduzgun-security/jug-model
```

```javascript
const { poutine, user } = require('@dduzgun-security/jug-model');
```

## Publishing

Packages are automatically published to GitHub Packages on releases via GitHub Actions.