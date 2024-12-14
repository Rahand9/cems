const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use the routes
app.use('/api/events', eventRoutes);  // Event routes
app.use('/api/auth', authRoutes);     // Auth routes

// Default route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));