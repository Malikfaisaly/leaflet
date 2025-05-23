const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Random coordinates generator
const generateRandomMarkers = (count) => {
  const cities = [
    { name: 'London', lat: 51.505, lng: -0.09 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 }
  ];
  const markers = [];
  for (let i = 0; i < count; i++) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    markers.push({
      id: i + 1,
      lat: randomCity.lat + (Math.random() - 0.5) * 0.1, // Slight variation
      lng: randomCity.lng + (Math.random() - 0.5) * 0.1,
      name: randomCity.name
    });
  }
  return markers;
};

// API endpoint for dynamic markers
app.get('/api/markers', (req, res) => {
  const markers = generateRandomMarkers(3); // 3 random markers
  res.json(markers);
});

app.listen(port, () => {
  console.log(`Server chal raha hai http://localhost:${port}`);
});