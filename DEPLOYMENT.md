# Deployment Guide (Vercel)

This project is ready for deployment. Follow these steps:

1.  **Push to GitHub**: Ensure your latest code is pushed to your repository.
2.  **Import to Vercel**: 
    - Go to Vercel Dashboard -> Add New -> Project.
    - Import your repository.
3.  **Environment Variables**:
    - In the Vercel Project Settings, add the following variables:
        - `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
        - `JWT_SECRET`: A long, secure random string for signing tokens.
4.  **Deploy**: Click Deploy.

## Troubleshooting
- If the build fails on database connection, ensure `MONGODB_URI` is set in Vercel.
- If images break, ensure they are in `public/` folder.
- If you see "500 Internal Server Error", check Vercel Logs (usually missing env vars).
