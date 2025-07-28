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

const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');
const clinicRoutes = require('./routes/clinics');
const tipsRoutes = require('./routes/tips');
const emergencyRoutes = require('./routes/emergency');

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "https://nurtura-hazel.vercel.app",
  credentials: true,
}));

app.use(morgan('dev'));

app.use(express.json());

const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

let swaggerDocument = {};
try {
  const swaggerPath = path.join(__dirname, 'swagger.json');
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
} catch (err) {
  console.warn("⚠️ Swagger documentation not found or invalid:", err.message);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'HealthPulse API Docs'
}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to HealthPulse API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/emergency', emergencyRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined. Check your environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, 
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📄 API Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
