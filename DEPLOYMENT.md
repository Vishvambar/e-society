# Deployment Guide

This project is ready for deployment on Vercel.

## Environment Variables
You MUST configure the following environment variables in your Vercel Project Settings:

1.  **MONGODB_URI**: Your MongoDB connection string.
    *   *Note: Ensure "Access from anywhere" (0.0.0.0/0) is enabled in MongoDB Atlas Network Access, as Vercel IP addresses are dynamic.*

2.  **JWT_SECRET**: A strong random string for signing tokens.
    *   You can generate one using: `openssl rand -base64 32`

## Deployment Steps
1.  Push this code to a GitHub repository.
2.  Import the repository in Vercel.
3.  Add the environment variables listed above.
4.  Click "Deploy".

## Build Settings
*   **Framework Preset**: Next.js (Default)
*   **Build Command**: `next build` (Default)
*   **Install Command**: `npm install` (Default)
