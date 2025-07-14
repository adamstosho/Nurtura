# HealthPulse Frontend

A modern, beautiful, and fully functional frontend for the HealthPulse health tracking application built with React.js, Vite, and Tailwind CSS.

## Features

- **Authentication**: User registration, login, and profile management
- **Symptom Tracker**: Log symptoms and receive relevant health tips
- **Symptom History**: View and filter symptom history with date ranges
- **Health Tips**: Browse general health tips and recommendations
- **Clinic Finder**: Search for healthcare facilities by region, city, or name
- **Emergency Contacts**: Manage and access emergency contacts
- **Responsive Design**: Mobile-friendly interface with professional health theme

## Tech Stack

- **React.js 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

## Design System

The application follows a comprehensive design system with:

- **Primary Color**: #0066CC (Strong Blue - trust, health)
- **Secondary Color**: #33B864 (Green - healing, success)
- **Accent Color**: #FFA500 (Orange - alerts, action)
- **Typography**: Inter font family with responsive scaling
- **Components**: Consistent buttons, inputs, cards, and modals
- **Accessibility**: WCAG compliant with proper ARIA labels

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- HealthPulse backend API running on http://localhost:5000

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd healthpulse-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your API base URL:
\`\`\`env
VITE_API_BASE_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at http://localhost:3000

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## API Integration

The frontend integrates with all HealthPulse API endpoints:

- **Authentication**: `/auth/register`, `/auth/login`, `/auth/profile`
- **Symptoms**: `/symptoms`, `/symptoms/history`
- **Health Tips**: `/tips`
- **Clinics**: `/clinics`
- **Emergency Contacts**: `/emergency`

All API requests include proper error handling, loading states, and user feedback through toast notifications.

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   └── ...
├── contexts/           # React contexts for state management
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── SymptomTracker.jsx
│   └── ...
├── utils/              # Utility functions
│   └── api.js
├── App.jsx             # Main app component
└── main.jsx           # Entry point
\`\`\`

## Key Features

### Authentication
- Secure JWT token storage
- Protected routes
- User profile management
- Automatic token refresh handling

### Symptom Tracking
- Easy symptom logging with common symptom suggestions
- Instant health tips based on logged symptoms
- Comprehensive symptom history with filtering

### Health Tips
- Browse curated health tips
- Search and filter functionality
- Responsive card layout

### Clinic Finder
- Search by region, city, or clinic name
- Integration with mapping services for directions
- Detailed clinic information display

### Emergency Contacts
- Regional emergency contacts
- Personal emergency contact management
- One-click calling functionality

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized navigation for mobile devices

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
