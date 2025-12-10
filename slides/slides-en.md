---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Protocol Buffers & Buf
  Building Type-Safe Microservices with Shared Models and Validations
drawings:
  persist: false
transition: slide-left
title: Protocol Buffers & Buf - Poutine Rating Platform
mdc: true
---

# Protocol Buffers & Buf

## Building Type-Safe Microservices with Shared Models and Validations

**Poutine Rating Platform**

---

# About Me

<div class="flex items-start gap-12 mt-8">

<img src="https://avatars.githubusercontent.com/u/59659739?v=4" alt="Profile" class="rounded-xl w-48 flex-shrink-0" />

<div class="flex-1">

- Product Security @ HashiCorp (now part of IBM)
- I build things as a developer and question them as an attacker
- Built this demo to solve real-world model synchronization problems
- Continuously debugging my dog's behavior 🐶

<div class="mt-6 text-sm opacity-70">

**GitHub:** [github.com/dduzgun-security](https://github.com/dduzgun-security)

</div>

</div>

</div>

---

# Quick Question...

<div class="text-center mt-20">

**How many of you have spent hours debugging why the frontend sends `poutine_size` but the backend expects `size`?**

<div class="text-6xl mt-10">
🙋‍♂️ 🙋‍♀️ 🙋
</div>

</div>

---

# The Problem: Model Hell 🔥

<div class="text-center mt-20">

**What if I told you that problem could never happen again?**

Let me show you the nightmare first...

</div>

---

# The Nightmare: Same Data, Different Definitions

```javascript
// Frontend sends this:
{
  poutine_size: "medium",
  restaurant: "La Banquise",
  rating: 8
}
```

```java
// Java service expects this:
class PoutineRating {
    String size;              // ← Different field name!
    String restaurantName;    // ← Different field name!
    int score;                // ← Different field name!
}
```

```go
// Go service expects this:
type Poutine struct {
    Size       string  // ← Different casing!
    Restaurant string
    Rating     float64 // ← Different type!
}
```

---

# The Disaster in Production

**3 AM: Your phone rings** 📱

```text
ERROR: Field 'poutine_size' not found
ERROR: Field 'rating' type mismatch (int vs float64)
ERROR: Required field 'restaurantName' missing

💥 500 Internal Server Error
```

<v-clicks>

**Root cause:** Frontend was updated but backend definitions weren't.

⏰ **Time to fix:** 4 hours.  
📉 **Downtime:** 45 minutes.  
😤 **Frustrated users:** 1,247. 

</v-clicks>

---

# Real Pain Points (Yes, These Happened)

<div class="text-sm">

<v-clicks>

❌ **Field Name Mismatches**
- Frontend: `poutine_size` vs Backend: `size`
- 2 hours debugging "field not found"

❌ **Type Confusion**
- JS sends string `"8"`, Backend expects int `8`
- Runtime errors in production

❌ **Validation Chaos**
- Frontend allows 50 chars for restaurant name
- Backend allows 10 chars
- Users see "Success!" then data is rejected

❌ **Version Drift**
- Backend adds `location` field with validation
- Frontend doesn't know about it which causes silent data loss

</v-clicks>

</div>

---

# The Copy-Paste Maintenance Nightmare

**To add ONE field, you need to update:**

<v-clicks>

1. Frontend TypeScript interface
2. Frontend validation logic
3. Java model class
4. Java validation annotations
5. Go struct definition
6. Go validation functions
7. API documentation
8. Waisting time on other teams changes
9. Tests in 3 languages

</v-clicks>

<v-click>

⏰ **Total time:** 2-3 hours.  
❌ **Risk of mistakes:** Very high.  
😤 **Developer happiness:** Very low 😭. 

</v-click>

---

# Current State of Our Demo App

**Shared Model Layer**
- 📦 **jug-model** - Protocol Buffer definitions with validation

**3 Backend Services (Polyglot Architecture)**
- 🐹 **User Service** (Go) - Port 8002
- ☕ **Poutine Rating Service** (Java) - Port 8001
- 🟢 **Consent Service** (Node.js) - Port 8000

**1 Frontend**
- ⚛️ React + Vite

<v-click>

**The Challenge:** Keep all 4 codebases + shared models in sync!

</v-click>

---

# What is Protocol Buffers?

**Google's language-neutral, platform-neutral data serialization format**

```protobuf
message Poutine {
    string restaurant = 1;           // Field numbers for wire format
    uint32 cheese_squeakiness = 2;   // Strong typing (uint32, not just int)
    uint32 gravy_thickness = 3;
    uint32 fries_crispiness = 4;
    string size = 5;
    string comments = 6;
}
```

**Key Technical Benefits:**
- 🎯 **IDL (Interface Definition Language)** - Contract-first API design
- 📦 **Binary serialization** - Smaller payloads than JSON (up to 6x)
- 🔒 **Strong typing** - Compile-time type checking across languages
- 🔄 **Schema evolution** - Add/remove fields without breaking clients
- ⚡ **Code generation** - No manual serialization/deserialization code

---

# Generated Code: Same Definition, Multiple Languages

**From one `.proto` file, protobuf generates idiomatic code for each language:**

````md magic-move
```java
// Java (camelCase with getters/setters)
public class Poutine {
    private String restaurant;     // same type mapping
    private int cheeseSqueakiness; // uint32 → int
    private int gravyThickness;
    private int friesCrispiness;
    private String size;
    private String comments;
}
```

```javascript
// JavaScript (camelCase)
{
    restaurant: "La Banquise",     // same type mapping
    cheeseSqueakiness: 8,          // uint32 → number
    gravyThickness: 9,
    friesCrispiness: 7,
    size: "Medium",
    comments: "Delicious!"
}
```
````

**Key Point:** Same logical fields, idiomatic naming for each language (Go uses PascalCase, Java/JS use camelCase)

---

# Enter Buf: The Modern Protobuf Toolchain

**Why raw `protoc` isn't enough:**

<v-clicks>

🔧 **Better Tooling**
- Simpler configuration (`buf.yaml` vs complex protoc flags)
- Faster compilation
- Better error messages

📦 **Package Management**
- Publish to registries (GitHub Packages, Buf Schema Registry)
- Versioned dependencies
- Easy distribution across teams

🛡️ **Lint & Breaking Change Detection**
- Prevents accidental API breaks
- Enforces best practices

</v-clicks>

---

# Our Buf Workflow

```bash
# 1. Generate code for all languages
cd jug-model && buf generate

# Output:
# ├── jug-model-go/       → Go packages
# ├── jug-model-java/     → Java artifacts
# └── jug-model-js/       → NPM package
```

```bash
# 2. Publish to GitHub Packages (automated via CI)
npm publish @dduzgun-security/jug-model
```

```bash
# 3. Install in services
npm install @dduzgun-security/jug-model@latest  # Frontend & JS service
go get github.com/.../jug-model-go@main         # Go service
mvn install                                      # Java service
```

---

# The Killer Feature: Protovalidate

**Validation rules IN the schema**

```protobuf
message Poutine {
    string restaurant = 1 [
        (buf.validate.field).required = true,
        (buf.validate.field).string.max_len = 128
    ];

    uint32 cheese_squeakiness = 2 [
        (buf.validate.field).required = true,
        (buf.validate.field).uint32.gte = 0,
        (buf.validate.field).uint32.lte = 10
    ];

    string size = 5 [
        (buf.validate.field).required = true,
        (buf.validate.field).string.pattern = "^(Small|Medium|Large|X-Large)$"
    ];
}
```

**Pre-built validation rules:** https://protovalidate.com/reference/rules/

---

# One Definition, Enforced Everywhere

````md magic-move
```javascript
// Frontend (React)
const validator = createValidator()
const validation = validator.validate(PoutineSchema, poutineRating)

if (validation.kind !== 'valid') {
    throw new Error(`Validation failed: ${validation.violations}`)
}
```

```java
// Java Service
Validator validator = new ValidatorImpl();
ValidationResult result = validator.validate(poutine);
```

```go
// Go Service
v := protovalidate.New()
if err := v.Validate(poutine); err != nil {
    return fmt.Errorf("validation failed: %w", err)
}
```
````

---

# Before vs After

<div class="grid grid-cols-2 gap-4">

<div>

### Before (Scattered Validation)

```text
Frontend:   if (size !== 'small' && size !== 'medium') { ... }
Java API:   @Size(min=1, max=10)
Go API:     if rating < 0 || rating > 10 { ... }
JS API:     if (!['small','medium'].includes(size)) { ... }
```

**Total: ~50+ lines of validation code**

</div>

<div v-click>

### After (Protovalidate)

```protobuf
string size = 5 [
    (buf.validate.field).string.pattern =
      "^(Small|Medium|Large|X-Large)$"
];
```

**Total: 3 lines, enforced everywhere**

</div>

</div>

---

# Architecture Overview

```text
┌─────────────────────────────────────────────────────┐
│                  jug-model (Proto)                  │
│            Single Source of Truth                   │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
       ┌───────▼────────┐    ┌────────▼────────┐
       │  GitHub         │    │  Direct Import  │
       │  Packages       │    │  (Go modules)   │
       └───────┬─────────┘    └────────┬────────┘
               │                       │
    ┌──────────┼───────────────────────┼──────────┐
    │          │                       │          │
┌───▼────┐ ┌──▼─────┐ ┌──────────┐ ┌──▼──────┐
│Frontend│ │Consent │ │ Poutine  │ │  User   │
│(React) │ │Service │ │ Service  │ │ Service │
│        │ │ (JS)   │ │ (Java)   │ │  (Go)   │
└────────┘ └────────┘ └──────────┘ └─────────┘
```

All services use identical types with identical validation!

---

# Live Demo: Adding a Location Field

**Scenario:** Product wants to track where the poutine was consumed

<v-clicks>

**Current state:** Location not captured

**Goal:** Add location field with validation in ~2 minutes

</v-clicks>

---

# Demo Step 1: Update the Proto

```protobuf
message Poutine {
    string restaurant = 1 [
        (buf.validate.field).required = true,
        (buf.validate.field).string.max_len = 128
    ];
    // ... existing fields ...

    // NEW FIELD
    string location = 7 [
        (buf.validate.field).required = true,
        (buf.validate.field).string.pattern = "^[A-Za-z\\s,]+$",
        (buf.validate.field).string.max_len = 100
    ];
}
```

---

# Demo Step 2: Generate Code

```bash
cd jug-model && buf generate
```

**Output:** Code generated for all 3 languages

```text
✓ jug-model-go/rating/poutine/v1/poutine.pb.go
✓ jug-model-java/com/rating/poutine/v1/Poutine.java
✓ jug-model-js/rating/poutine/v1/poutine_pb.js
```

<v-click>

**All services now have:**
- Type-safe `location` field
- Built-in validation (required, pattern, max length)
- Consistent field naming across languages

</v-click>

---

# Demo Step 3: Update Frontend

```jsx
// Add to form state
const [formData, setFormData] = useState({
    // ... existing fields ...
    location: ''  // NEW FIELD - TypeScript knows about it!
})

// Add input field
<input
    name="location"
    value={formData.location}
    onChange={handleInputChange}
    placeholder="e.g., Montreal, QC"
/>

// Validation happens automatically via protovalidate
const poutine = create(PoutineSchema, {
    // ... existing fields ...
    location: formData.location  // Auto-validated!
})
```

---

# Demo Step 4: Services Automatically Validate

**No backend code changes needed!**

All services already use the validator:

```javascript
// JS Consent Service - already validates
validator.validate(PoutineSchema, data)
```

```java
// Java Poutine Service - already validates
validator.validate(poutine)
```

```go
// Go User Service - already validates
protovalidate.Validate(poutine)
```

<v-click>

**Location field is now validated everywhere with zero extra code!**

</v-click>

---

# Demo Results

**What we got in ~2 minutes:**

<v-clicks>

✅ Field added to 3 backend services (Go, Java, JS).  
✅ Field added to frontend with TypeScript types.  
✅ Validation enforced in all 4 applications.  
✅ Consistent error messages everywhere.  
✅ Zero code duplication.  

</v-clicks>

<v-click>

**Traditional approach:** Hours of manual updates across 4 repos.  
**Modern approach:** Releasing a new model and bumping the version

</v-click>

---

# Key Benefits Recap

<v-clicks>

🎯 **Single Source of Truth**
- One proto file → guaranteed consistency

🔒 **Type Safety**
- Compile-time errors instead of runtime surprises

✅ **Unified Validation**
- Define once, enforce everywhere

🚀 **Productivity**
- Minutes to add fields vs hours of manual updates

🔧 **Better Tooling**
- Buf makes protobuf development actually enjoyable

</v-clicks>

---

# When to Use This Approach

<div class="grid grid-cols-2 gap-8">

<div>

**Perfect for:**
- Microservices with multiple languages
- Teams that value type safety
- APIs with strict validation requirements
- Projects with frontend + backend coordination

</div>

<div v-click>

**Maybe overkill for:**
- Single language monoliths
- Quick prototypes/MVPs
- Teams unfamiliar with protobufs (learning curve)

</div>

</div>

---

# Getting Started

**1. Install Buf**
```bash
brew install bufbuild/buf/buf
```

**2. Initialize your project**
```bash
buf mod init
```

**3. Write your proto**
```protobuf
syntax = "proto3";
import "buf/validate/validate.proto";

message YourModel {
    string field = 1 [(buf.validate.field).required = true];
}
```

**4. Generate**
```bash
buf generate
```

---

# Resources

📚 **Documentation**
- Buf: https://buf.build/docs
- Protovalidate: https://github.com/bufbuild/protovalidate
- Protocol Buffers: https://protobuf.dev

💻 **Demo Repository**
- https://github.com/dduzgun-security/jug
- Complete working example with Go/Java/JS services

🎓 **Buf Schema Registry**
- https://buf.build/explore
- Browse public schemas and learn patterns

---
class: text-center
---

# Questions?

**Demo App:** https://github.com/dduzgun-security/jug

<div class="mt-10">

**Key Takeaway:**

Stop manually syncing models across services.
Let Protocol Buffers + Buf + Protovalidate do the heavy lifting.

**Your time is better spent building features, not debugging type mismatches.**

</div>

---
layout: center
class: text-center
---

# Thank You!

**Let's make microservices type-safe again.**

<div class="text-6xl mt-10">
🍟 Now go rate some poutine! 🧀
</div>
