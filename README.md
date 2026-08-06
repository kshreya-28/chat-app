# QuickChat

A full-stack real-time chat application built with the MERN stack and Socket.IO. Supports instant messaging, image sharing, live online-status tracking, and JWT-based authentication.

## Features

- Real-time one-to-one messaging via WebSockets (Socket.IO)
- Image sharing in chat, with automatic cloud storage (Cloudinary)
- Live online/offline user status
- Unseen message counters per conversation
- JWT authentication with persistent login
- Editable user profiles
- Responsive UI with a searchable contact sidebar and shared-media panel

## Tech Stack

**Frontend:** React, React Router, Tailwind CSS, Axios, Socket.IO Client
**Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO
**Auth:** JSON Web Tokens (JWT)
**Media Storage:** Cloudinary

## Project Structure

```
CHAT APP/
├── CLIENT/
│   ├── context/          # Auth & Chat context providers
│   └── src/
│       ├── components/   # Sidebar, ChatContainer, RightSidebar
│       ├── pages/        # Home, Login, Profile
│       └── lib/          # Utility functions
└── SERVER/
    ├── controllers/      # Auth & message logic
    ├── lib/              # DB connection, Cloudinary config
    ├── middleware/       # Auth middleware
    ├── models/           # Mongoose schemas
    └── routes/           # API route definitions
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account

### Setup

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd "CHAT APP"
   ```

2. Install dependencies for both client and server
   ```bash
   cd SERVER && npm install
   cd ../CLIENT && npm install
   ```

3. Create a `.env` file inside `SERVER/` with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Create a `.env` file inside `CLIENT/` with:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. Run the backend
   ```bash
   cd SERVER
   npm run dev
   ```

6. Run the frontend (in a separate terminal)
   ```bash
   cd CLIENT
   npm run dev
   ```

7. Visit `http://localhost:5173` (or whatever port Vite prints) in your browser.

## Notes

- `.env` files are excluded from version control — never commit real credentials.
- Socket connections are keyed by user ID; ensure `VITE_BACKEND_URL` matches your running server's address and port.
