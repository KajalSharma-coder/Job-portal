# AI Job Portal

A full-stack MERN job portal with resume analysis, job recommendations, leaderboard analytics, and an admin panel.

## Tech Stack

- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT auth + optional Google OAuth token verification
- Recharts for analytics

## Project Structure

```text
client/   React frontend
server/   Express backend
```

## Quick Start

1. Install dependencies:

```bash
npm run install:all
```

2. Copy env files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Start MongoDB locally or update `MONGO_URI`.

4. Run the apps:

```bash
npm run dev:server
npm run dev:client
```

## Notes

- Google auth expects a Google ID token. If `GOOGLE_CLIENT_ID` is not configured, the backend falls back to a demo-mode mock verification flow for local development.
- Resume parsing supports PDF and DOCX directly. Legacy DOC files fall back to plain-text extraction when possible.
- Admin-only routes require a user with `role: "admin"` in MongoDB.

