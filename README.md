
<div align="center">
  <h1>🤖 Munazzem - AI Event Assistant</h1>
  <p>
    A secure, full-stack AI chat application designed to provide information about events and schedules through a conversational interface, powered by the Google Gemini API.
  </p>
  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/React-18.3-blue?logo=react" alt="React">
    <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=nodedotjs" alt="Node.js">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
  </p>
  <br />
  <img src="https://i.postimg.cc/2594SQTc/image.png" alt="Munazzem Chat Interface" width="700"/>
</div>

---

## 📝 Overview

**Munazzem** (Arabic for "Organizer") is a sophisticated, full-stack AI chat application. Its primary function is to serve as a specialized assistant that answers user queries about a predefined list of events. The project demonstrates a secure and scalable architecture by separating the client-facing application (**Frontend**) from the service that communicates with the AI model (**Backend**).

This separation is crucial for protecting sensitive information, such as API keys and proprietary system prompts, which are kept securely on the server and never exposed to the client's browser.

---

## 🏛️ Project Architecture

The application follows a classic client-server model to ensure security and modularity:

- **Frontend (Client):** A modern, responsive user interface built with **React**, **Vite**, and **TypeScript**. It's responsible for rendering the chat interface, managing user input, and displaying messages. It communicates with our own backend, not directly with the Gemini API.

- **Backend (Server):** A lightweight and robust API server built with **Node.js**, **Express**, and **TypeScript**. Its responsibilities are:
  - To receive questions from the frontend.
  - To construct a detailed, secure system prompt containing the event data.
  - To securely call the external Google Gemini API.
  - To return the AI's response to the frontend.

This architecture ensures that the `GEMINI_API_KEY` and the core AI logic are never compromised.

---

## ✨ Key Features

### UI & UX

- **Modern & Responsive Design:** Built with **Tailwind CSS** for a clean interface that works on all devices.
- **Fluid Animations:** Smooth animations powered by **Framer Motion** for a premium user experience.
- **Intuitive Interface:** A classic chat layout that is easy to use and understand.
- **Real-time Feel:** Loading indicators provide instant feedback to the user.

### Backend & Security

- **API Key Protection:** The Gemini API key is stored securely in an `.env` file on the server.
- **Prompt Secrecy:** The system prompt, which defines the AI's behavior, resides exclusively on the backend.
- **Controlled Access:** The backend acts as a proxy, giving you full control over API usage.

### AI Integration

- **Specialized Assistant:** The AI is carefully instructed to act as an "Organizer," focusing only on event-related queries.
- **Context-Aware Responses:** The prompt includes the current date, allowing the AI to answer time-sensitive questions.
- **Formatted & Structured Output:** The AI provides clear, well-formatted, and chronologically sorted lists.

---

## 🚀 Tech Stack

| Area         | Technology                                                                         |
|--------------|-------------------------------------------------------------------------------------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Router   |
| **Backend**  | Node.js, Express.js, TypeScript, undici, dotenv, cors                              |
| **AI Service** | Google Gemini API (gemini-1.5-flash)                                             |

---

## 📁 Project Structure

```

.
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AiChat.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md

````

---

## ⚙️ Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- `npm` (comes with Node.js)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create the environment file from the example
cp .env.example .env

# Add your Gemini API key to the .env file
# Open .env and replace with your actual key
# GEMINI_API_KEY=your_real_key_here

# Start the server
npm start
````

Your backend server will now be running on `http://localhost:3001`.

### 2. Frontend Setup

In a **new terminal window**, set up and run the React client:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
```

Your frontend application will now be running on `http://localhost:5173`.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=65&section=footer"/>
</p>

