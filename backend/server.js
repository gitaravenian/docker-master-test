import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import messageRoutes from "./routes/messages.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";

// Load environment variables
dotenv.config();

const app = express();

// Configure middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[Server] ${req.method} request to: ${req.url}`);
  console.log('[Server] Origin:', req.headers.origin);
  next();
});

// Configure CORS - only allow frontend URL (port 3000)
const allowedOrigins = ['http://localhost:3000'];
console.log('[Server] Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse cookies
app.use(cookieParser());

// Parse JSON requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    cors: {
      enabled: true,
      allowedOrigins
    }
  });
});

// Use the message routes for contact form submissions
app.use('/api/contact', messageRoutes);

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount blog routes
app.use('/api/blog', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server] Error:', err);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`[Server] Server running on port ${PORT}`);
  console.log(`[Server] CORS enabled for:`, allowedOrigins);
});