Cosmos Explorer 
Welcome to the CosmosExplorer, a web application that provides users with access to NASA's rich data using its public APIs. The app allows users to explore various space phenomena such as coronal mass ejections, asteroid close approaches, space imagery, and much more.

Table of Contents
Project Overview
Features
Technologies
API Endpoints
Project Structure
Getting Started
Prerequisites
Installation
Running the Backend
Running the Frontend
Environment Variables
Deployment
Future Improvements
Project Overview
This application enables users to explore NASA's vast array of space-related data in a visually appealing and interactive way. It consists of a React frontend and a Node.js backend, which communicates with NASA's Open APIs to fetch real-time space data.

Features
Browse Astronomy Picture of the Day (APOD).
Explore Near-Earth Objects (NEO), Mars Rover Photos, and Coronal Mass Ejections (CMEs).
Visualize space events on interactive maps using Leaflet.
Filter data by date and visualize space weather data.
Responsive design with an intuitive user interface.
Error handling and edge case management for better user experience.
Technologies
Frontend: React, TypeScript, Tailwind CSS, Axios, Leaflet, D3, Plotly.js
Backend: Node.js, Express, Axios, Helmet
Deployment: Vercel (Frontend), Render (Backend)
NASA APIs: Near Earth Objects (NeoWs), Coronal Mass Ejections (DONKI), Mars Rover, Earth Imagery, and more.
API Endpoints
The backend serves as a middle layer between the frontend and NASA's public APIs. Below are some of the key routes:

APOD: /api/v1/apod
Asteroid (NeoWs): /api/v1/asteroid/feed
Coronal Mass Ejections (DONKI): /api/v1/donki/cme
Earth Imagery: /api/v1/earthimagery
Mars Rover: /api/v1/marsRover
Exoplanets: /api/v1/exoplanets
EPIC (Earth Polychromatic Imaging Camera): /api/v1/epic
Project Structure
Backend
bash
Copy code
backend/
│
├── Config/                   # Configuration files
├── Routes/                   # Route definitions for NASA APIs
├── controller/               # Controllers for handling business logic
├── exceptions/               # Custom error handling
├── loader/                   # Express loaders
├── middleware/               # Express middlewares
├── repository/               # Data access layer
├── server.js                 # Main entry point
└── utils/                    # Utility functions
Frontend
bash
Copy code
frontend/
│
├── public/                   # Public assets
├── src/
│   ├── api/                  # API call logic
│   ├── components/           # React components
│   ├── hooks/                # Custom hooks
│   ├── layout/               # Layout components
│   ├── pages/                # Pages in the app
│   ├── store/                # Global state management
│   ├── App.tsx               # Main App component
│   ├── index.tsx             # Entry point
│   └── styles/               # Tailwind CSS configurations
Getting Started
Prerequisites
Node.js (v16+)
npm or yarn
A NASA API key (sign up at https://api.nasa.gov)
Installation
Clone the Repository
bash
Copy code
git clone https://github.com/Saljithchettorusubhash/NASA-project.git
cd NASA-project
Running the Backend
Navigate to the backend directory:

bash
Copy code
cd backend
Install the dependencies:

bash
Copy code
npm install
Set up the environment variables: Create a .env file and provide your NASA API key. Example:

bash
Copy code
NASA_API_KEY=your-nasa-api-key
Start the backend server:

bash
Copy code
npm run dev
The backend should now be running on http://localhost:3311/.

Running the Frontend
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the dependencies:

bash
Copy code
npm install
Start the frontend in development mode:

bash
Copy code
npm run dev
The frontend should now be running on http://localhost:5173/.

Environment Variables
Both the backend and frontend use environment variables. Here’s a list of the required ones:

Backend .env Example:
bash
Copy code
NASA_API_KEY=your-nasa-api-key
Frontend .env Example:
You may want to store the API URL and other config variables here for ease of deployment.

bash
Copy code
VITE_API_URL=http://localhost:3311/api/v1
Deployment
Frontend (Vercel)
The frontend has been deployed using Vercel. You can access it here.

Backend (Render)
The backend has been deployed using Render. You can access it here.

Future Improvements
Add More Data Visualizations: Implement more interactive charts using Plotly and D3.
Search and Filtering: Improve the filtering capabilities to search space data by date range, event type, and other criteria.
User Authentication: Implement user login to allow customization of data views and save preferences.
