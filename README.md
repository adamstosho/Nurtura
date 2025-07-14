# Nurtura

## Introduction
Nurtura is a modern web application designed to help people track their health, find clinics, access emergency contacts, and receive helpful health tips. It is built to make health management easy, accessible, and user-friendly for everyone.

## Problems Addressed
Many people struggle to keep track of their health symptoms, find reliable clinics, or access emergency contacts quickly. Nurtura solves these problems by providing a single platform where users can log symptoms, get health advice, find clinics (as in, directly map to the hospital), and store emergency contacts (you can also personally store emergency contacts), all in one place.

## Main Features
- **User Authentication**: Register, log in, and manage your profile securely.
- **Symptom Tracker**: Log your health symptoms and receive instant health tips.
- **Symptom History**: View and filter your past symptoms easily.
- **Health Tips**: Browse and search for helpful health advice.
- **Clinic Finder**: Search for clinics by region, city, or name.
- **Emergency Contacts**: Store and access important emergency contacts quickly.
- **Responsive Design**: Works well on both mobile and desktop devices.

## How to Use and Navigate the App
1. **Register or Log In**: Start by creating an account or logging in with your email and password.
2. **Dashboard**: After logging in, you will see your dashboard. Here, you can view recent symptoms and health tips.
3. **Log Symptoms**: Go to the "Log Symptom" page to enter your current health symptoms. You will get instant tips based on your input.
4. **View Symptom History**: Check the "History" page to see all your past symptoms and filter them by date.
5. **Browse Health Tips**: Visit the "Health Tips" page to read and search for useful health advice.
6. **Find Clinics**: Use the "Find Clinics" page to search for clinics near you by region, city, or name.
7. **Emergency Contacts**: Access the "Emergency" page to view or add important emergency contacts for quick help.
8. **Profile Management**: Go to your "Profile" page to update your personal information or log out.

## Tools and Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Styling**: Tailwind CSS (with custom colors and responsive design)
- **API Requests**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API

## Getting Started
### Prerequisites
- Node.js (version 16 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Nurtura
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up environment variables:
   - For the frontend, copy `.env.example` to `.env` and set your API base URL.
   - For the backend, set up your database and any required environment variables.
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```
6. Open your browser and go to `http://localhost:3000` to use the app.


## **Preview of the App (Screenshot)**


![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-login-2025-07-14-17_48_51.png)

**Login page**

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-register-2025-07-14-17_49_09.png)

**Registration page**


![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-2025-07-14-17_49_42.png)

This is the user **dashboard**

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-symptoms-history-2025-07-14-17_51_45.png)

This is the **history page**, this handles the history of symptoms logged with its statistics


![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-tips-2025-07-14-17_52_08.png)

This page shows the **health tips**, this is shown daily and will be replaced by another batch in the next day, this is actually handled with third-party API

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-clinics-2025-07-14-17_53_11.png)

This is the find **clinic page**

![screenshot](/frontend/public/screenshot/screencapture-google-maps-dir-6-6642782-3-188018-6-5177-3-3538-6-6376331-3-2163108-11-84z-data-4m4-4m3-1m1-4e1-1m0-2025-07-14-17_54_51.png)

This is the **map showing the direction to the nearest clinic(hospital)**

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-emergency-2025-07-14-17_55_27.png)

This is the page to locate the emergency contacts

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-emergency-2025-07-14-17_55_44.png)

This modal is where one can add **emergency contacts**

![screenshot](/frontend/public/screenshot/screencapture-localhost-3000-emergency-2025-07-14-17_55_56.png)

This modal is where the **emergency contacts** can be edited





## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

*** Built with 😍💖 by ART_Redox for the sake of sound wellbeing improvement*** 
__ Powered by DLT Africa ___