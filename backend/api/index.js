// api/index.js
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require('../routes/auth');
const symptomRoutes = require('../routes/symptoms');
const clinicRoutes = require('../routes/clinics');
const tipsRoutes = require('../routes/tips');
const emergencyRoutes = require('../routes/emergency');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: "https://nurtura-hazel.vercel.app", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HealthPulse API" });
});
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/emergency', emergencyRoutes);

// Export as serverless handler
module.exports = serverless(app);
