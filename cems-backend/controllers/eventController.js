const db = require('../db');

// Create a new event
exports.createEvent = (req, res) => {
  const { title, description, date, location, category } = req.body;

  // Ensure the user is an organizer
  if (req.user.role !== 'organizer') {
    return res.status(403).send('Only organizers can create events.');
  }

  db.query(
    'INSERT INTO events (title, description, date, location, category, organizer_id) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, date, location, category, req.user.id],
    (err, result) => {
      if (err) {
        console.error('Error creating event:', err.message);
        return res.status(500).send('Error creating event');
      }
      res.status(201).send({ message: 'Event created successfully', eventId: result.insertId });
    }
  );
};

// Get all events
exports.getEvents = (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Error fetching events:', err.message);
      return res.status(500).send('Error fetching events');
    }
    res.status(200).json(results);
  });
};

// Get recommended events by category
exports.getRecommendedEvents = (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).send('Category is required');
  }

  db.query(
    'SELECT * FROM events WHERE category = ?',
    [category],
    (err, results) => {
      if (err) {
        console.error('Error fetching recommended events:', err.message);
        return res.status(500).send('Error fetching recommended events');
      }
      res.status(200).json(results);
    }
  );
};

// Update an event
exports.updateEvent = (req, res) => {
  const { id, title, description, date, location, category } = req.body;

  db.query(
    'UPDATE events SET title = ?, description = ?, date = ?, location = ?, category = ? WHERE id = ?',
    [title, description, date, location, category, id],
    (err) => {
      if (err) {
        console.error('Error updating event:', err.message);
        return res.status(500).send('Error updating event');
      }
      res.status(200).send({ message: 'Event updated successfully' });
    }
  );
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting event:', err.message);
      return res.status(500).send('Error deleting event');
    }
    res.status(200).send({ message: 'Event deleted successfully' });
  });
};