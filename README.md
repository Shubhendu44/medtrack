💊 MedTrack — Medicine Tracking Web App

MedTrack is a full-stack medicine tracking platform that helps users manage their daily medications, track adherence, and maintain a clean history of treatments.

Users can securely register, log in, add medicines, track daily intake, edit schedules, and view past medicines through a responsive dashboard.

This project demonstrates a production-ready full-stack architecture using React, Node.js, Express, MongoDB, JWT authentication, and cloud deployment.

🌐 Live Application

🖥 Frontend (Vercel)
https://medtrack-amber.vercel.app

⚙️ Backend API (Render)
https://medtrack-mqas.onrender.com

🧠 Project Overview

MedTrack solves a common problem: forgetting or mismanaging medicines.

The platform provides a personal medicine dashboard where users can manage medications efficiently.

Key abilities include:

• Managing medicines with dosage and schedule
• Tracking whether medicines were taken daily
• Maintaining medicine history
• Secure authentication and private user data

✨ Core Features
🔐 Secure Authentication

JWT-based authentication system ensures secure user sessions.

• User registration and login
• Password hashing with bcrypt
• Protected backend routes
• Token-based authentication

💊 Medicine Management

Users can fully manage their medicines through the dashboard.

Supports:

• Adding medicines
• Editing medicines
• Deleting medicines
• Scheduling start and end dates
• Custom dosage tracking

📅 Daily Medicine Tracking

Each medicine supports daily adherence tracking.

Users can mark medicines as:

🟢 Taken
🟡 Pending / Not Taken

The dashboard visually updates medicine status using color indicators.

📜 Medicine History

MedTrack automatically organizes medicines into:

• Active medicines
• History (deleted or completed medicines)

This provides a clean and organized medication record.

🧰 Tech Stack
🎨 Frontend

React
React Router
Tailwind CSS
Framer Motion

Deployed using Vercel

⚙️ Backend

Node.js
Express.js

Provides a RESTful API for authentication and medicine management.

Deployed using Render

🗄 Database

MongoDB Atlas

Stores:

• Users
• Medicines
• Daily medicine logs

🔑 Authentication

JWT (JSON Web Tokens)

Used for:

• Secure login sessions
• API authentication
• Protected user routes

🏗 Architecture

Frontend (React + Tailwind)
⬇
REST API
⬇
Backend (Node.js + Express)
⬇
MongoDB Atlas Database

🚀 Deployment

Frontend hosted on Vercel
Backend hosted on Render
Database hosted on MongoDB Atlas

👨‍💻 Author

Shubhendu Modak

GitHub
https://github.com/Shubhendu44


