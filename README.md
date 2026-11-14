# 📚 Past Exam Library & Focus Study Room

> **An intelligent, gamified, and offline-resilient exam preparation platform for Ethiopian secondary school students (Grades 9–12). Built for students, by students.**

[![Live Demo](https://img.shields.io/badge/Demo-past--exam--library.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://past-exam-library.vercel.app)
[![Telegram Community](https://img.shields.io/badge/Telegram-%40BGMCS1236-blue?style=for-the-badge&logo=telegram)](https://t.me/BGMCS1236)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-orange?style=for-the-badge&logo=pwa)](https://past-exam-library.vercel.app)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)

---

## 🌟 What's New: The All-in-One Focus Study Platform

Past Exam Library has evolved from a simple PDF repository into a full **interactive study ecosystem** designed to keep students focused, motivated, and exam-ready.

---

### 1. 🎯 Focus Study Room (Split-Screen Study Desk)
A distraction-free, split-pane study environment tailored for deep revision:
- **Left Pane**: Read built-in unit notes, high-yield formula cheatsheets, blueprints, or original PDF exam papers.
- **Right Pane**: Interact with your personal AI Study Coach, solve practice questions, or take auto-saving revision notes.
- **Responsive Layout**: Adapts gracefully across laptops, tablets, and mobile screens.

---

### 2. 📖 Upward Interactive Unit Notes Deck
Say goodbye to long, tiring vertical scrolls. The new **Upward Card Deck** lets you flip seamlessly through 5 high-yield revision modules:
- 📌 **Overview**: Core rules, syllabus outlines, and fundamental concepts.
- 📐 **High-Yield Formulas**: Must-memorize equations with one-click copy.
- 💡 **National Exam Worked Examples**: Real Ethiopian exam questions solved step-by-step with final answer badges.
- ⚠️ **Examiner Traps & Common Pitfalls**: Critical warning signs and mistakes to avoid under exam pressure.
- 💬 **Student Notes & Community Tips**: Open crowd-sourced insights from peers.

---

### 3. 💬 Open Community Topic Notes & Peer Tips
Students can now contribute their own knowledge directly to each unit topic:
- **Share Knowledge**: Add exam shortcuts, teacher tricks, and mnemonic aids (+20 XP reward).
- **Tagging**: Categorize notes as `⚡ Exam Shortcut`, `🧠 Mnemonic Trick`, `📝 Key Summary`, or `⚠️ Traps & Tips`.
- **Peer Upvoting**: Click `❤️ Helpful` on peer notes to highlight top-rated contributions.
- **Seamless 1-Click Publishing**: Draft thoughts in your private study scratchpad and publish them to the community topic with a single tap.

---

### 4. 🤖 Archie: Socratic AI Study Coach & Mentor
Meet Archie, an energetic, curriculum-aligned study mentor:
- **Socratic Guidance**: Doesn't just give answers away—offers hints, clues, and formula reminders first.
- **Dual Engine**: Works **100% offline out-of-the-box** using built-in Ethiopian curriculum heuristics, with an optional cloud Google Gemini API upgrade.
- **Unit Quizzes**: Ask Archie to test you on any unit you just finished studying.

---

### 5. ⏱️ 25-Minute Focus Pomodoro Sprint Timer
Based on proven active recall and spaced repetition techniques:
- **Default 25-Minute Sprint**: Starts at `25:00 min` with a 5-minute break cycle.
- **Quick Controls**: Instant `START`, `PAUSE`, `↺ 25m` reset, and mode toggle (`25m Focus / 5m Break`).
- **Live Tab Countdown**: Tab title updates in real-time (e.g. `(24:35 min) 🎯 Focus Study Room`) so you can keep track of time while multitasking.
- **Pulsing Focus Glow**: Tactile visual feedback when running.

---

### 6. 🔥 Duolingo-Style Gamified Learning
- **Daily Study Streaks**: Earn fire flame badges (`🔥 7d`) and XP for daily focus sprints and practice drills.
- **Shared Streaks with Friends**: Invite classmates, maintain shared streaks, and send study nudges.
- **⚔️ 1v1 Telegram Study Duels**: Challenge classmates on Telegram to a fast 5-question exam battle and see who comes out on top!
- **Session Celebrations**: Fun confetti, fanfare chimes, and streak milestone popups.

---

### 7. 🧪 Interactive Practice Bank & Tactile 3D Cards
- National exam and model exam questions categorized by grade, subject, and unit.
- Tactile 3D option cards with instant validation, detailed explanations, and score tracking.

---

### 8. 📱 Progressive Web App (PWA) & 100% Offline Readiness
- Powered by Service Worker (`v2.2.0`).
- Installable on **Android**, **iOS**, **Windows**, and **macOS**.
- Study notes, formulas, practice bank, and offline AI coach work seamlessly even when the internet drops.

---

## 🔐 Access & Security

- **Student Access**: Free open registration directly on the platform or 1-click Google Sign-In.
- **Guest Access**: Instant 1-click access to all public past exams, unit study desk, and offline AI coach without logging in.
- **Administrator Access**: Protected via server environment variable (`ADMIN_PASSWORD`). For production security, default demo admin credentials are retired. Set `ADMIN_PASSWORD` in your Vercel project environment settings to access the management portal.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), Modern Glassmorphism CSS, Service Worker (PWA)
- **Backend**: Node.js, Express.js
- **Storage**: JSON File Persistence / LocalStorage / Supabase integration ready
- **Deployment**: Vercel Serverless Hosting
- **AI Engine**: Local Ethiopian Curriculum Rules Engine + Gemini Interactions API

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer recommended)
- `npm`

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/Kidus-yahun/past-exam-library.git
   cd past-exam-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start server:
   ```bash
   npm start
   # or with live reload:
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

---

## 📡 Key API Endpoints

### Community Topic Notes
- `GET /api/topic-notes?grade=Grade 12&subject=Mathematics&unitIndex=0` - Fetch community notes for a topic
- `POST /api/topic-notes` - Contribute a new note or tip
- `POST /api/topic-notes/:id/like` - Upvote a helpful note

### AI Study Coach
- `POST /api/ai-tutor` - Query Archie with student question, grade, and subject context

### Examination Repository
- `GET /api/exams` - Filter and retrieve exam papers
- `POST /api/exams` - Upload new PDF paper (Admin only)
- `DELETE /api/exams/:id` - Delete paper (Admin only)

### Practice Bank
- `GET /api/practice` - Retrieve curriculum questions
- `POST /api/practice/questions` - Add new practice questions (Admin only)

---

## 👥 Community & Telegram Channel

Join the official Telegram channel for newly uploaded model exams, national exam answer keys, and study group discussions:

👉 **Telegram Channel**: [@BGMCS1236](https://t.me/BGMCS1236)  
👉 **Live Web Platform**: [past-exam-library.vercel.app](https://past-exam-library.vercel.app)

---

## 📄 License
Crafted with ❤️ for Ethiopian students. Released under the ISC License.
