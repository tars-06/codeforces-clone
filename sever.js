const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Change this to your preferred port

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(__dirname));

app.use(express.static('public'));

// Define an API endpoint to fetch and filter students from IIT Kharagpur
app.get('/api/students', async (req, res) => {
  try {
    // Fetch user information from your Codeforces API endpoint (replace with your actual endpoint)
    const response = await axios.get('https://codeforces.com/api/user.ratedList');
    const codeforcesUsers = response.data.result;

    // Filter students from IIT Kharagpur
    const iitKharagpurStudents = codeforcesUsers.filter((user) => {
      // Assuming the organization is specified in the 'organization' field of user data
      return user.organization === 'IIT Kharagpur';
    });

    res.json(iitKharagpurStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching and filtering students' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});