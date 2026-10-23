# Past Exam Library & Management Portal

An accessible, student-led learning resource that organizes past examination papers by grade, semester, exam type, and subject—helping students find the resources they need to prepare with confidence.

---

## 🚀 Key Features

### 1. 🔐 Authentication & Role-Based Access
- **Login-First Landing Flow**: Visitors land on a modern authentication screen with Sign In and Account Creation.
- **Roles**:
  - **Admin**: Full access to upload exam papers, create/remove grade categories, and manage curriculum subjects.
  - **Student**: Access to browse past papers, search by keyword, preview exams in the viewer, and download PDF files.
- **Quick Demo Access**: 1-click credential prefill for testing (`Admin Demo`, `Student Demo`, or `Guest Student`).

### 2. ⚙️ Admin Management Dashboard
- **Analytics & Overview**: Live metrics tracking total exam papers, categories/grades, subjects, and registered users.
- **Exam Paper Uploads**:
  - Upload PDF files directly (up to 50MB via Multer storage) or link external PDF URLs.
  - Specify Exam Title, Grade Category, Semester, Exam Type (Mid 1, Mid 2, Final, Pre-test, Model Exam), Subject, and Academic Year.
  - Manage existing exam papers with live search/filters, PDF preview, download, and permanent deletion.
- **Category & Taxonomy Management**:
  - Add and delete custom Grades (e.g., Grade 8, Grade 9, Grade 10, Grade 11, Grade 12, University).
  - Manage curriculum subjects per grade (add new subjects with one click or remove obsolete ones).

### 3. 📚 Dynamic Student Library & PDF Viewer
- **Search Engine**: Search examination papers by subject, keyword, grade, or semester with instant results.
- **Interactive Browsing**: Dynamic grade and semester navigation matching the original clean aesthetic.
- **Embedded PDF Viewer**: Fullscreen document preview iframe with direct download and new-tab view options.

---

## 🔑 Default Credentials

| Role | Username | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | Full access (Upload papers, manage categories, admin dashboard) |
| **Student** | `student` | `student123` | Student access (Browse, search, view & download papers) |

*You can also create new student accounts directly using the **Create Account** tab or click **Continue as Guest**.*

---

## 🛠️ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Run

1. Clone or navigate to the repository:
   ```bash
   cd past-exam-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user & return JWT session
- `POST /api/auth/register` - Register a new student account
- `GET /api/auth/me` - Validate active token

### Categories & Subjects (Admin Only for Mutations)
- `GET /api/categories` - Fetch all grades, semesters, exam types, and subjects
- `POST /api/categories/grade` - Add a new grade category
- `DELETE /api/categories/grade/:gradeId` - Remove a grade category and associated papers
- `POST /api/categories/subject` - Add a subject to a grade
- `DELETE /api/categories/subject` - Remove a subject from a grade

### Examination Papers
- `GET /api/exams` - Query exam papers (supports `?grade=`, `?semester=`, `?subject=`, `?search=`)
- `POST /api/exams` - Upload a new exam paper (Multipart/form-data with PDF file or URL)
- `DELETE /api/exams/:id` - Delete an exam paper and its stored file

### Metrics
- `GET /api/stats` - Summary statistics for dashboard

---

## 👥 Contributors & Credits
- **Original Project**: Created by **Soliyana Tewodros** & **Nahom Temesgen**
- **Repository**: [https://github.com/soliyana-dev/past-exam-library](https://github.com/soliyana-dev/past-exam-library)
- Built for students, by students.
