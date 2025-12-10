---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Protocol Buffers & Buf
  Simplifier la validation et les modèles distribués avec Buf et Protovalidate
drawings:
  persist: false
transition: slide-left
title: Protocol Buffers & Buf - Plateforme d'Évaluation de Poutine
mdc: true
---

# Protocol Buffers & Buf

## Simplifier la validation et les modèles distribués avec Buf et Protovalidate

**Application d'évaluation de Poutine 🍟🧀**

---

# À Propos de Moi

<div class="flex items-start gap-12 mt-8">

<img src="https://avatars.githubusercontent.com/u/59659739?v=4" alt="Profile" class="rounded-xl w-48 flex-shrink-0" />

<div class="flex-1">

- Product Security @ HashiCorp (maintenant partie d'IBM)
- Je développe des logiciels et je les challenge avec un regard offensif
- J'ai créé cette démo pour résoudre des problèmes de synchronisation de modèles
- Je débogue continuellement le comportement de mon chien 🐶

<div class="mt-6 text-sm opacity-70">

**GitHub:** [github.com/dduzgun-security](https://github.com/dduzgun-security)

</div>

</div>

</div>

---

# Question Rapide...

<div class="text-center mt-20">

**Combien d'entre vous ont passé des heures à déboguer pourquoi le frontend envoie `poutine_size` mais le backend attend `size` ?**

<div class="text-6xl mt-10">
🙋‍♂️ 🙋‍♀️ 🙋
</div>

</div>

---

# Le Problème : L'Enfer des Modèles 🔥

<div class="text-center mt-20">

**Et si je vous disais que ce problème pourrait ne plus jamais arriver ?**

Laissez-moi d'abord vous montrer le cauchemar...

</div>

---

# Le Cauchemar : Mêmes Données, Définitions Différentes

```javascript
// Le Frontend envoie ceci:
{
  poutine_size: "medium",
  restaurant: "La Banquise",
  rating: 8
}
```

```java
// Le service Java attend ceci:
class PoutineRating {
    String size;              // ← Nom de champ différent!
    String restaurantName;    // ← Nom de champ différent!
    int score;                // ← Nom de champ différent!
}
```

```go
// Le service Go attend ceci:
type Poutine struct {
    Size       float64 // ← Type différent!
    Restaurant string
    Rating     float64 // ← Type différent!
}
```

---

# Le Désastre en Production

**3h du matin : Votre téléphone sonne** 📱

```text
ERROR: Field 'poutine_size' not found
ERROR: Field 'rating' type mismatch (int vs float64)
ERROR: Required field 'restaurantName' missing

💥 500 Internal Server Error
```

<v-clicks>

**Cause racine (exemple) :** Le frontend a été mis à jour mais pas les définitions du backend.

⏰ **Temps de correction :** 4 heures.  
📉 **Temps d'arrêt :** 45 minutes.  
😤 **Utilisateurs frustrés :** 1 247.  

</v-clicks>

---

# Points de friction

<div class="text-sm">

<v-clicks>

❌ **Incompatibilités de Noms de Champs**
- Frontend: `poutine_size` vs Backend: `size`
- 2 heures à déboguer "field not found"

❌ **Confusion de Types**
- JS envoie la chaîne `"8"`, le Backend attend l'entier `8`
- Erreurs d'exécution en production

❌ **Chaos de Validation**
- Le Frontend autorise 50 caractères pour le nom du restaurant
- Le Backend autorise 10 caractères
- Les utilisateurs voient "Succès!" puis les données sont rejetées

❌ **Dérive de Version**
- Le Backend ajoute un champ `location` avec validation
- Le Frontend ne le sait pas, ce qui cause une perte silencieuse de données

</v-clicks>

</div>

---

# Le Cauchemar de Maintenance par Copier-Coller

**Pour ajouter UN champ, vous devez mettre à jour :**

<v-clicks>

1. L'interface TypeScript du frontend
2. La logique de validation du frontend
3. La classe modèle Java
4. Les annotations de validation Java
5. La définition de struct Go
6. Les fonctions de validation Go
7. La documentation de l'API
8. Perdre du temps sur les changements d'autres équipes
9. Ajouter des tests dans 3 langages et repositories

</v-clicks>

<v-click>

⏰ **Temps total :** 2-3 heures.  
❌ **Risque d'erreurs :** Très élevé.  
😤 **Bonheur des développeurs :** Très faible 😭.  

</v-click>

---

# État Actuel de Notre Application Démo

**Couche de Modèle Partagé**
- 📦 **jug-model** - Définitions Protocol Buffer avec validation

**3 Services Backend (Architecture Polyglotte)**
- 🐹 **User Service** (Go) - Port 8002
- ☕ **Poutine Rating Service** (Java) - Port 8001
- 🟢 **Consent Service** (Node.js) - Port 8000

**1 Frontend**
- ⚛️ React + Vite

<v-click>

**Le Défi :** Garder les 4 bases de code + modèles partagés synchronisés !

</v-click>

---

# Qu'est-ce que Protocol Buffers ?

**Le format de sérialisation de données créé par Google, agnostique en langage et en plateforme**

```protobuf
message Poutine { // Defining the message
    string restaurant = 1;           // Field numbers order
    uint32 cheese_squeakiness = 2;   // Strong typing (uint32, not just int)
    uint32 gravy_thickness = 3;
    uint32 fries_crispiness = 4;
    string size = 5;
    string comments = 6;
}
```

**Avantages Techniques Clés :**
- 🎯 **IDL (Interface Definition Language)** - Conception d'API "contract-first"
- 📦 **Sérialisation binaire** - Plus petit que JSON (jusqu'à 6x)
- 🔒 **Typage fort** - Vérification des types à la compilation dans tous les langages supportés
- 🔄 **Évolution du schéma** - Ajouter/supprimer des champs sans casser les clients
- ⚡ **Génération de code** - Pas de code de sérialisation/désérialisation manuel

---

# Code Généré : Même Définition, Plusieurs Langages

**À partir d'un seul fichier `.proto`, protobuf génère du code idiomatique pour chaque langage :**

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

// https://github.com/dduzgun-security/jug/tree/main/jug-model/jug-model-java/src/main/java/com/rating/poutine/v1
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

// https://github.com/dduzgun-security/jug/blob/main/jug-model/jug-model-js/rating/poutine/v1
```

```go
// Go (PascalCase)
type Poutine struct {
	Restaurant        string                 
	CheeseSqueakiness uint32                 
	GravyThickness    uint32                 
	FriesCrispiness   uint32                
	Size              string                
	Comments          string                 
}

// https://github.com/dduzgun-security/jug/blob/main/jug-model/jug-model-go/rating/poutine/v1
```

````

---

# Entrez Buf : La Chaîne d'Outils Protobuf Moderne

**Pourquoi la commande `protoc` seul ne suffit pas :**

<v-clicks>

🔧 **Meilleurs Outils**
- Configuration plus simple (`buf.yaml` vs drapeaux protoc complexes)
- Compilation plus rapide
- Meilleurs messages d'erreur

📦 **Gestion de Packages**
- Publier vers des registres (GitHub Packages, Buf Schema Registry)
- Dépendances versionnées
- Distribution facile entre les équipes

🛡️ **Lint & Détection de Breaking Changes**
- Empêche les ruptures accidentelles d'API
- Applique les meilleures pratiques

</v-clicks>

---

# Notre Workflow Buf

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
mvn install                                     # Java service
```

Sinon, on peut mettre les commandes dans un Makefile pour ne pas toujours les tapper.  
https://github.com/dduzgun-security/jug/blob/main/Makefile

---

# La Fonctionnalité KILLER : Protovalidate 🔥

**Règles de validation DANS le schéma**

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

**Règles de validation pré-construites :** https://protovalidate.com/reference/rules/

**Règles de validation dans nos protos :** https://github.com/dduzgun-security/jug/tree/main/jug-model/proto

---

# Une Définition, Appliquée Partout

````md magic-move
```javascript
// Frontend (React)
const validator = createValidator()
const validation = validator.validate(PoutineSchema, poutineRating)

if (validation.kind !== 'valid') {
    throw new Error(`Validation failed: ${validation.violations}`)
}

// https://github.com/dduzgun-security/jug/pull/3/files
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

# Avant vs Après

<div class="grid grid-cols-2 gap-4">

<div>

### Avant (Validation Éparpillée)

```text
Frontend:   if (size !== 'small' && size !== 'medium') { ... }
Java API:   @Size(min=1, max=10)
Go API:     if rating < 0 || rating > 10 { ... }
JS API:     if (!['small','medium'].includes(size)) { ... }
```

**Total : ~50+ lignes de code de validation**

</div>

<div v-click>

### Après (Protovalidate)

```protobuf
string size = 5 [
    (buf.validate.field).string.pattern =
      "^(Small|Medium|Large|X-Large)$"
];
```

**Total : 3 lignes, appliquées partout**

</div>

</div>

---

# Vue d'Ensemble de l'Architecture

```text
┌─────────────────────────────────────────────────────┐
│               jug-model (Proto)                     │
│            Single Source of Truth                   │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
       ┌───────▼─────────┐    ┌───────▼─────────┐
       │  GitHub         │    │  Direct Import  │
       │  Packages       │    │  (Go modules)   │
       └───────┬─────────┘    └────────┬────────┘
               │                       │
    ┌──────────┼───────────────────────│
    │          │           │           │          
┌───▼────┐ ┌───▼────┐ ┌────▼─────┐ ┌───▼─────┐
│Frontend│ │Consent │ │ Poutine  │ │  User   │
│(React) │ │Service │ │ Service  │ │ Service │
│        │ │ (JS)   │ │ (Java)   │ │  (Go)   │
└────────┘ └────────┘ └──────────┘ └─────────┘
```

**Tous** les services utilisent des **types** identiques avec une **validation** identique !

---

# Démo en Direct : Ajouter un Champ Location

**Scénario :** Le produit veut suivre où la poutine a été consommée

<v-clicks>

**État actuel :** *Location* du restaurant non capturée

**Objectif :** Ajouter un champ location avec validation en ~2 minutes

</v-clicks>

---

# Démo Étape 1 : Mettre à Jour le Proto

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
        (buf.validate.field).string.max_len = 100
    ];
}
```

---

# Démo Étape 2 : Générer le Code

```bash
make generate-models
```

**Sortie :** Code généré pour les 3 langages

```text
✓ jug-model-go/rating/poutine/v1/poutine.pb.go
✓ jug-model-java/com/rating/poutine/v1/Poutine.java
✓ jug-model-js/rating/poutine/v1/poutine_pb.js
```

**Push, release & bump :** Il faut attendre un petit instant avant de bump
```bash
git add . && git commit -m "add: restaurant location" && git push
sleep(60) # bump pom.xml version
git pull && make start-all
```

<v-click>

**Tous les services ont maintenant :**
- Champ `location` type-safe
- Validation intégrée (requis, pattern, longueur max)
- Nommage de champ cohérent entre les langages

</v-click>

---

# Démo Étape 3 : Mettre à Jour le Frontend

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

# Démo Étape 4 : Les Services Valident Automatiquement

**Aucun changement de code backend nécessaire !**

Tous les services utilisent déjà le validateur :

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

**Le champ location est maintenant validé partout sans code supplémentaire !**

</v-click>

---

# Résultats de la Démo

**Ce que nous avons obtenu en ~2 minutes :**

<v-clicks>

✅ Champ ajouté à 3 services backend (Go, Java, JS).  
✅ Champ ajouté au frontend avec les types TypeScript.  
✅ Validation appliquée dans les 4 applications.  
✅ Messages d'erreur *cohérents* partout.  
✅ Zéro duplication de code.  
✅ Aucun test unitaire à ajouter.  

</v-clicks>

<v-click>

**Approche traditionnelle 👎 :** Des heures de mises à jour manuelles dans 4 repositories.  
**Approche moderne 👍:** Publier un nouveau modèle et augmenter la version.

</v-click>

---

# Récapitulatif des Avantages Clés

<v-clicks>

🎯 **Source Unique de Vérité**
- Un fichier proto → cohérence garantie

🔒 **Sécurité des Types**
- Erreurs à la compilation au lieu de surprises à l'exécution

✅ **Validation Unifiée**
- Définir une fois, appliquer partout

🚀 **Productivité**
- Minutes pour ajouter des champs vs heures de mises à jour manuelles

🔧 **Meilleurs Outils**
- Buf rend le développement protobuf vraiment agréable

</v-clicks>

---

# Quand Utiliser Cette Approche

<div class="grid grid-cols-2 gap-8">

<div>

**Parfait pour :**
- Microservices avec plusieurs langages
- Équipes qui valorisent la sécurité des types
- APIs avec des exigences de validation strictes
- Projets avec coordination frontend + backend

</div>

<div v-click>

**Peut-être excessif pour :**
- Monolithes en un seul langage
- Prototypes rapides/MVPs
- Équipes non familières avec protobuf (courbe d'apprentissage)

</div>

</div>

---

# Démarrage

**1. Installer Buf**
```bash
brew install bufbuild/buf/buf
```

**2. Initialiser votre projet**
```bash
buf mod init
```

**3. Écrire votre proto**
```protobuf
syntax = "proto3";
import "buf/validate/validate.proto";

message YourModel {
    string field = 1 [(buf.validate.field).required = true];
}
```

**4. Générer**
```bash
buf generate
```

---

# Ressources

📚 **Documentation**
- Buf: https://buf.build/docs
- Protovalidate: https://github.com/bufbuild/protovalidate
- Protocol Buffers: https://protobuf.dev

💻 **Dépôt de Démonstration**
- https://github.com/dduzgun-security/jug
- Exemple fonctionnel complet avec services Go/Java/JS

🎓 **Buf Schema Registry**
- https://buf.build/explore
- Parcourir les schémas publics et apprendre des modèles

---
class: text-center
---

# Questions ?

**Application de Démonstration :** https://github.com/dduzgun-security/jug

<div class="mt-10">

**Point Clé à Retenir :**

Évitez de synchroniser manuellement les modèles entre les services,  
laissez Protocol Buffers + Buf + Protovalidate faire le gros du travail.

**Votre temps est mieux utilisé à construire des fonctionnalités, pas à déboguer des incompatibilités de types.**

</div>

---
layout: center
class: text-center
---

# Merci !

**https://github.com/dduzgun-security/jug**

<div class="text-5xl mt-10">
🍟 Fini les <code>NullPointerException: poutine</code> dans son assiette ! 🧀
</div>
