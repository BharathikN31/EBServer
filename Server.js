const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (including index.html)
app.use(express.static(path.join(__dirname, 'public')));
let dataFromServer;
// Endpoint to handle POST requests from the Spring Boot API
app.post('/receive-data', (req, res) => {
    // Extract the JSON data from the request body
    const jsonData = req.body;
    dataFromServer = {
        current: jsonData.current,
        voltage: jsonData.voltage
    };

    // Log the received JSON data
    console.log('Received JSON data:', jsonData,dataFromServer.current,dataFromServer.voltage);

    // Send a response back to the Spring Boot API
    res.send('Data received successfully');
});

// Endpoint to handle GET requests for data
app.get('/get-data', (req, res) => {
    console.log(dataFromServer);
    res.json(dataFromServer); // Send the data as JSON response to the client
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


