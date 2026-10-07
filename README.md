<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/75dd3810-36b8-4b71-a07d-98a097d9c865

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## APRA LMS - secure local setup

1. Copy `.env.example` to `.env` and configure `DATABASE_URL`, a **random secret of at least 32 characters** as `AUTH_SECRET`, and a **unique administrator password of at least 12 characters** as `ADMIN_INITIAL_PASSWORD`. Do not commit your .env file.
2. Start PostgreSQL with `docker compose up -d postgres`, then run `npm install`, `npx prisma db push` and `npx tsx prisma/seed.ts`.
3. Run `npm run dev` and sign in using `admin@apra.edu.com` and your configured `ADMIN_INITIAL_PASSWORD`.

The seed command **resets the administrator password** to the value currently in `ADMIN_INITIAL_PASSWORD` each time it runs. Change the password before the first run; remove it from the environment after initial setup if not needed.

The API now verifies credentials and signed session tokens, blocks unauthenticated data access, and restricts user administration to admins. The UI remains a prototype: course creation, document uploads, and several other modules still require backend implementation. Do not use real student records until access control, tenant isolation, rate limiting and production deployment are reviewed.
