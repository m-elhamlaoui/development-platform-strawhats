# UML Diagrams - Classes Courses Manager

This folder contains PlantUML source files for the system's UML diagrams.

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
