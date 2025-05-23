
---

### README.md Content


```markdown
# Dynamic Leaflet Map Demo

This is a modern, interactive map application built with **React**, **Leaflet**, and **Node.js**. It displays dynamic markers fetched from a backend API, featuring a sleek UI with dark/light mode toggle, refresh functionality, and responsive design. The project is designed to showcase a professional and polished implementation for the Upwork job requirement.

## Features
- **Dynamic Markers**: Fetches random location markers from a Node.js backend API.
- **Modern UI**: Glassmorphism design with gradients, shadows, and smooth animations.
- **Theme Toggle**: Switch between light and dark modes for better UX.
- **Interactive Controls**: Refresh button to fetch new markers and custom zoom controls.
- **Responsive**: Optimized for both desktop and mobile devices.
- **Error Handling**: Displays loading spinner and error messages for robust UX.

## Tech Stack
- **Frontend**: Vite, React, react-leaflet, Tailwind CSS, react-spinners
- **Backend**: Node.js, Express
- **Map**: Leaflet with OpenStreetMap tiles

## Project Structure
- `leaflet-backend/`: Node.js server providing the API for dynamic markers.
- `leaflet-frontend/leaflet-map/`: React frontend with the Leaflet map and UI.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd leaflet-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The API will be available at `http://localhost:5000/api/markers`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd leaflet-frontend/leaflet-map
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser to view the map.

## Usage
- **View Map**: The map loads with random markers fetched from the backend.
- **Refresh Markers**: Click the "Refresh" button to fetch new random markers.
- **Toggle Theme**: Click the "Dark Mode"/"Light Mode" button to switch themes.
- **Zoom Controls**: Use the "+" and "-" buttons to zoom in/out.

## Deployment
- **Frontend**: Deploy on Vercel:
  ```bash
  npm run build
  npm install -g vercel
  vercel
  ```
- **Backend**: Deploy on Heroku or use a local server for demo purposes.

## Notes
- Ensure the backend server is running before starting the frontend.
- The demo is optimized for modern browsers (Chrome, Firefox, etc.).
- For any issues, check the console (F12) for errors or refer to the project documentation.

## License
This project is for demonstration purposes only and is not licensed for commercial use.