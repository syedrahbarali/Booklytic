# 📚 Booklytic

A full-stack book review platform built with MERN stack (MongoDB, Express, React, Node.js) where bibliophiles can discover, review, and discuss books.

## ✨ Features

- **Book Management**

  - Add/edit books with details (title, author, genre, etc.)
  - Cover image uploads
  - Filter books by genre/search

- **Reviews System**

  - Star ratings (1-5)
  - User reviews with timestamps
  - Average rating calculations

- **User Authentication**

  - Secure login/signup with JWT
  - Protected routes
  - Personalized dashboards

- **Community Features**
  - Reader testimonials
  - Newsletter subscription
  - Social sharing

## 🛠 Tech Stack

**Frontend**

- React 18
- React Router 6
- Framer Motion (animations)
- Tailwind CSS (styling)
- React Icons
- Axios (API calls)

**Backend**

- Node.js + Express
- MongoDB (with Mongoose)
- JWT authentication
- Multer (file uploads)

## 🚀 Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB Atlas account or local MongoDB
- Git

### 1. Backend Setup

```bash
# Clone repository
git clone https://github.com/syedrahbarali/Booklytic.git
cd booklytic/server

# Install dependencies
npm install

# Environment variables
Create .env file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000
UPLOAD_FOLDER=./uploads


**Frontend Setup**
cd ../client
npm install

# Environment variables
Create .env file with:
REACT_APP_API_URL=http://localhost:5000

**Running the App**
# Start backend (from /server)
npm start

# Start frontend (from /client)
npm start
```
