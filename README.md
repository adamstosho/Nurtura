# Nurtura

## Introduction
Nurtura is a modern web application designed to help people track their health, find clinics, access emergency contacts, and receive helpful health tips. It is built to make health management easy, accessible, and user-friendly for everyone.

## Problem Statement
Many people struggle to keep track of their health symptoms, find reliable clinics, or access emergency contacts quickly. Nurtura solves these problems by providing a single platform where users can log symptoms, get health advice, find clinics, and store emergency contacts, all in one place.

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

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact
If you have any questions or need help, please open an issue in the repository or contact the project maintainer. 