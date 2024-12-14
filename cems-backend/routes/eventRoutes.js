const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateJWT = require('../middleware/authMiddleware'); // JWT middleware to protect the route

// Get all events
router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).send('Error fetching events');
        }
        res.status(200).json(results); // Send events data to frontend
    });
});

// Get recommended events based on category
router.get('/recommendations', (req, res) => {
    const category = req.query.category;
    
    if (!category) {
        return res.status(400).send('Category is required');
    }

    db.query('SELECT * FROM events WHERE category = ?', [category], (err, results) => {
        if (err) {
            console.error('Error fetching recommended events:', err);
            return res.status(500).send('Error fetching recommended events');
        }
        res.status(200).json(results); // Send recommended events data
    });
});

// Register for an event (Only attendees can register)
router.post('/register', authenticateJWT, (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.id;

    // Check if the user is already registered
    db.query('SELECT * FROM registrations WHERE user_id = ? AND event_id = ?', [userId, eventId], (err, results) => {
        if (err) {
            console.error('Error checking registration:', err);
            return res.status(500).send('Error checking registration');
        }

        if (results.length > 0) {
            return res.status(400).send('You are already registered for this event.');
        }

        // Register the user for the event
        db.query('INSERT INTO registrations (user_id, event_id) VALUES (?, ?)', [userId, eventId], (err) => {
            if (err) {
                console.error('Error registering for event:', err);
                return res.status(500).send('Error registering for event');
            }
            res.status(201).send({ message: 'Successfully registered for the event.' });
        });
    });
});

// Get all registrations for the logged-in user
router.get('/registrations', authenticateJWT, (req, res) => {
    const userId = req.user.id;

    db.query(
        `SELECT events.* 
         FROM events 
         JOIN registrations ON events.id = registrations.event_id 
         WHERE registrations.user_id = ?`,
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error fetching registrations:', err);
                return res.status(500).send('Error fetching registrations');
            }
            res.status(200).json(results);  // Send registered events
        }
    );
});

module.exports = router;