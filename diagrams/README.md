# UML Diagrams - Classes Courses Manager

This directory contains PlantUML source files for the system's UML diagrams.

## 📊 Available Diagrams

### 2.1 Use Case Diagram
**File:** `use-case-diagram.puml`
- Shows interactions between users (Platform Admin, Class Admin, Student) and system functionality
- Illustrates access control and permission boundaries

### 2.2 Class Diagram  
**File:** `class-diagram.puml`
- Defines core entities: User, Class, File, FileShare, Storage
- Shows relationships and data structure
- Includes enumerations for roles, file types, and share types

### 2.3 Sequence Diagram
**File:** `sequence-diagram.puml` 
- Demonstrates file upload and sharing process
- Shows interaction between UI, controllers, services, and database
- Includes error handling for storage quotas

### 2.4 Activity Diagram
**File:** `activity-diagram.puml`
- Illustrates complete file management workflow
- Covers upload, sharing, download, and categorization processes
- Shows decision points and alternative paths

## 🛠️ How to Generate Diagrams

### Option 1: Online PlantUML
1. Visit http://www.plantuml.com/plantuml/uml/
2. Copy content from .puml files
3. Paste and generate

### Option 2: VS Code Extension
1. Install "PlantUML" extension
2. Open .puml files
3. Use Alt+D to preview

### Option 3: Command Line
```bash
# Install PlantUML
npm install -g node-plantuml

# Generate all diagrams
plantuml docs/diagrams/*.puml

# Generate specific diagram
plantuml docs/diagrams/use-case-diagram.puml
```

### Option 4: GitHub Integration
Add to your GitHub Actions workflow:
```yaml
- name: Generate PlantUML Diagrams
  uses: cloudbees/plantuml-github-action@master
  with:
    args: -v -tsvg docs/diagrams/*.puml
```

## 📝 Naming Convention
- Use kebab-case for file names
- Include diagram type in filename
- Use .puml extension
- Keep titles consistent with document sections

## 🔄 Updates
When modifying diagrams:
1. Update the corresponding .puml file
2. Regenerate images if needed
3. Update documentation references
4. Commit both source and generated files
