# HealthPulse Backend

A robust, production-ready backend for the HealthPulse health tracking application, built with Node.js, Express, and MongoDB.

## Features
- User authentication (JWT, hashed passwords)
- Symptom tracking and history
- Health tips API integration (with caching)
- Clinic finder (OpenStreetMap or static data)
- Emergency contacts (region-based, customizable)
- Security: CORS, helmet, rate limiting, input sanitization
- Validation and global error handling
- Ready for deployment (Heroku, Render, Railway)

## Folder Structure
```
HealthPulse-backend/
├── config/           # Database & external API config
├── controllers/      # Route logic
├── middleware/       # Auth, error handling, rate limiting
├── models/           # Mongoose schemas
├── routes/           # API endpoints
├── utils/            # Helper functions (e.g., fetch APIs)
├── validators/       # Request validation rules
├── tests/            # Jest/Mocha test placeholders
├── .env.example      # Example environment variables
├── package.json
├── README.md
└── server.js         # Main app entry
```

## Setup & Installation
1. Clone the repo and `cd HealthPulse-backend`
2. Copy `.env.example` to `.env` and fill in your values
3. Run `npm install`
4. Start MongoDB locally or use a cloud URI
5. Run `npm run dev` for development

## Environment Variables
See `.env.example` for all required variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `HEALTH_TIPS_API_URL`
- `CLINIC_API_URL`
- ...and more

## Scripts
- `npm start` — Run in production
- `npm run dev` — Run with nodemon
- `npm test` — Run Jest tests

## API Documentation
### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/profile` — Get user profile (JWT required)

### Symptoms
- `POST /api/symptoms` — Log symptom (JWT required)
- `GET /api/symptoms` — Get all symptoms (JWT required)
- `GET /api/symptoms/history` — Get symptom history (JWT required)

### Health Tips
- `GET /api/tips` — Get latest health tips

### Clinics
- `GET /api/clinics?region=...` — Search clinics by region
- `GET /api/clinics?lat=...&lon=...` — Search clinics by coordinates

### Emergency Contacts
- `GET /api/emergency?region=...` — Get emergency contacts (JWT optional)
- `POST /api/emergency` — Add/update user emergency contact (JWT required)

## Deployment
- Compatible with Heroku, Render, Railway
- Set environment variables in your deployment dashboard

## Testing
- Jest/Mocha structure in `/tests`

## License
MIT 