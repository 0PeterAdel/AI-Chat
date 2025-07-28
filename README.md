<div align="center">
<h1>🤖 Munazzem - AI Event Assistant</h1>
<p>
A secure, full-stack AI chat application designed to provide information about events and schedules through a conversational interface, powered by the Google Gemini API.
</p>

<img src="https://i.postimg.cc/2594SQTc/image.png" alt="Munazzem Chat Interface" width="700"/>
</div>
📝 Overview

Munazzem (Arabic for "Organizer") is a sophisticated, full-stack AI chat application. Its primary function is to serve as a specialized assistant that answers user queries about a predefined list of events. The project demonstrates a secure and scalable architecture by separating the client-facing application (Frontend) from the service that communicates with the AI model (Backend).

This separation is crucial for protecting sensitive information, such as API keys and proprietary system prompts, which are kept securely on the server and never exposed to the client's browser.
🏛️ Project Architecture

The application follows a classic client-server model to ensure security and modularity:

    Frontend (Client): A modern, responsive user interface built with React, Vite, and TypeScript. It's responsible for rendering the chat interface, managing user input, and displaying messages. It communicates with our own backend, not directly with the Gemini API.

    Backend (Server): A lightweight and robust API server built with Node.js, Express, and TypeScript. Its sole responsibilities are:

        To receive questions from the frontend.

        To construct a detailed, secure system prompt containing the event data and instructions.

        To securely call the external Google Gemini API with the prompt and the user's question.

        To return the AI's response to the frontend.

This architecture ensures that the GEMINI_API_KEY and the core logic of the AI's personality and data are never compromised.

<!-- Optional: Add an architecture diagram URL -->
✨ Key Features
UI & UX

    Modern & Responsive Design: Built with Tailwind CSS for a clean, beautiful interface that works on all devices.

    Fluid Animations: Smooth and engaging animations powered by Framer Motion for a premium user experience.

    Intuitive Interface: A classic chat layout that is easy to use and understand.

    Real-time Feel: Loading indicators and smooth message transitions provide feedback to the user.

Backend & Security

    API Key Protection: The Gemini API key is stored securely in an .env file on the server and is never exposed to the client.

    Prompt Secrecy: The detailed system prompt, which defines the AI's behavior and contains the event data, resides exclusively on the backend.

    Controlled Access: The backend acts as a proxy, giving you full control over API usage and the ability to add rate-limiting or authentication in the future.

AI Integration

    Specialized Assistant: The AI is carefully instructed via a system prompt to act as an "Organizer," focusing only on event-related queries.

    Context-Aware Responses: The prompt includes the current date, allowing the AI to answer time-sensitive questions like "What is the next event?".

    Formatted & Structured Output: The AI is instructed to provide clear, well-formatted, and chronologically sorted lists for a better reading experience.

🚀 Tech Stack

Area
	

Technology

Frontend
	

React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Router

Backend
	

Node.js, Express.js, TypeScript, undici, dotenv, cors

AI Service
	

Google Gemini API (gemini-1.5-flash)
📁 Project Structure

```
.
├── backend/
│   ├── node_modules/
│   ├── .env.example
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AiChat.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── ...
├── .gitignore
├── LICENSE
└── README.md
```

⚙️ Getting Started

Follow these instructions to set up and run the project on your local machine.
Prerequisites

    Node.js (v18 or newer recommended)

    npm (comes with Node.js)

    A Google Gemini API Key

1. Backend Setup

First, set up and run the server.

# 1. Navigate to the backend directory
`cd backend`

# 2. Install dependencies
`npm install`

# 3. Create the environment file
# This command renames the example file to .env
`mv .env.example .env`

# 4. Add your Gemini API key to the .env file
# Open the .env file and replace "Your_API_Key_Here" with your actual key
`# GEMINI_API_KEY=Your_API_Key_Here`

# 5. Start the server
`npm start`

The backend server will now be running on http://localhost:3001.
2. Frontend Setup

In a new terminal window, set up and run the React client.

# 1. Navigate to the frontend directory
`cd frontend`

# 2. Install dependencies
`npm install`

# 3. Start the React development server
`npm run dev`

The frontend application will now be running on `http://localhost:`'port'
