# 🎓 Classes Courses Manager

> A secure platform for universities to manage and share course-related files within classes.

## 📘 Overview

**Classes Courses Manager** is a web-based application designed to help universities securely share course materials among students and staff. The system ensures that file sharing happens only within defined class boundaries unless explicitly authorized for collaboration between classes.

Each user has a personal space where they can upload files, which can then be shared with individuals or the entire class. Files are categorized for better organization and accessibility.

---

## 🔐 User Roles

There are three types of users in the system:

| Role | Permissions |
|------|-------------|
| **Platform Admin** | Create and manage classes and assign class admins. |
| **Class Admin** | Manage students (add/remove) within their class and monitor shared content. |
| **Student** | Upload, share, and receive files within the class; send files directly to peers. |

---

## 📁 File Management

- Students can upload files to their **personal storage space**
- Files can be shared:
  - With specific students (direct sharing)
  - With the entire class
- Supported file types:
  - 📷 Images
  - 📄 PDFs
  - 💼 Microsoft Word documents
  - 📊 Excel spreadsheets
  - 📁 Custom categories (e.g., "Assignments", "Projects", etc.)

---

## 🧩 Key Features

- ✅ Class-based isolation of file sharing
- ✅ Direct file transfer between students
- ✅ File categorization (auto-detected or custom)
- ✅ Role-based access control
- ✅ Support for inter-class collaboration when enabled

---

## ⚙️ Tech Stack (Example)


- **Frontend/Backend**:next.js
- **Database**: sqlite
- **Authentication**: JWT
- **Storage**: Local filesystem

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)  or yarn
- Database engine

### Installation

```bash
git clone https://github.com/m-elhamlaoui/development-platform-strawhats.git
cd development-platform-strawhats.git
npm install
npm run dev
