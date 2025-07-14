// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Load Swagger documentation
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');
const clinicRoutes = require('./routes/clinics');
const tipsRoutes = require('./routes/tips');
const emergencyRoutes = require('./routes/emergency');

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors({
  origin: "https://nurtura-hazel.vercel.app",
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'HealthPulse API Documentation'
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/emergency', emergencyRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation available at: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 