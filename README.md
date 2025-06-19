# AUVNET Backend & Dashboard

This repository contains:

1. **Backend** – Express.js REST API with JWT authentication, MongoDB, role-based authorization, and routes for Auth, Admin, User Products, and Wishlist.

---

## Tech Stack

| Layer    | Tech |
|----------|------|
| Backend  | Node.js · Express.js · MongoDB · Mongoose · JWT · Bcrypt |

---

## Folder Structure

```
AUVNET Backend Task/
├─ app.js                # Backend entry point
├─ routes/               # Express route files
├─ controllers/          # Route controllers
├─ models/               # Mongoose models
├─ middlwares/           # Auth & role middlewares
└─ README.md             # (this file)
```

---

## Prerequisites

* Node.js >= 18
* MongoDB running locally **or** an Atlas connection string
* Git (to clone the repo)

---

## Quick Start

```bash
# 1. Clone
git clone <your-repo-url>
cd "AUVNET Backend Task"

# 2. Environment variables (backend)
cp .env.example .env          # then edit .env with your own values

# 3. Install dependencies
npm install                   # backend deps (run from project root)
cd frontend && npm install    # frontend deps
cd ..                         # back to project root

# 4. Run in development
npm run dev       # starts backend on http://localhost:5000  (uses nodemon)
cd frontend && npm start   # starts React on http://localhost:3001 (proxy → 5000)
```

Backend logs will show `Server running on port 5000`, while CRA will automatically open `http://localhost:3001`.

---

## Environment Variables

Create `.env` (or edit the generated copy) in the project root:

```
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=***********
PORT=****
```




| Command (root)  | Description |
|-----------------|-------------|
| `npm run dev`   | Start backend with Nodemon |
| `npm start`     | Start backend without nodemon |
| `npm test`      | Run backend tests (if provided) |

---

## Deployment

The app is ready for deployment on any Node-compatible host (Render, Heroku, Railway, etc.).
Ensure environment variables are set and CRA build output is served (or host the frontend separately on Netlify/Vercel).

### Live Demo

The application is deployed at:
- Backend: [https://auvnet-backend-task.onrender.com](https://auvnet-backend-task.Railway.com)

### Deployment Instructions

1. Backend:
   - Create a new project on Render.com
   - Link your GitHub repository
   - Set up environment variables:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `PORT`



Note: Make sure to update the API endpoint in the frontend to point to your deployed backend URL.

---

## License

MIT – do whatever you like, just attribute.
