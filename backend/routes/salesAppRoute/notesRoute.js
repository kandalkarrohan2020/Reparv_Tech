import express from 'express';
import db from '../../config/dbconnect.js';

const router = express.Router();

/* ------------------- GET Notes for a specific schedule ------------------- */
router.get('/:type/:id', (req, res) => {
  const { type, id } = req.params;

  db.query(
    'SELECT * FROM schedule_notes WHERE schedule_type = ? AND schedule_id = ? ORDER BY created_at DESC',
    [type, id],
    (err, result) => {
      if (err) {
        console.error('Error fetching notes:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(result); // ✅ MySQL returns array directly
    }
  );
});

/* ------------------- POST Create a new note ------------------- */
router.post('/', (req, res) => {
  console.log('Received note:', req.body);

  const { schedule_id, schedule_type, note, userid } = req.body;

  if (!schedule_id || !schedule_type || !note || !userid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO schedule_notes (schedule_id, schedule_type, note, user_id) VALUES (?, ?, ?, ?)',
    [schedule_id, schedule_type, note, userid],
    (err, result) => {
      if (err) {
        console.error('Error inserting note:', err.message);
        return res.status(500).json({ error: err.message });
      }

      // Fetch the inserted note (optional)
      db.query(
        'SELECT * FROM schedule_notes WHERE id = ?',
        [result.insertId],
        (err2, rows) => {
          if (err2) {
            console.error('Error fetching inserted note:', err2.message);
            return res.status(500).json({ error: err2.message });
          }
          res.json(rows[0]);
        }
      );
    }
  );
});

/* ------------------- PUT Update a note ------------------- */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  db.query(
    'UPDATE schedule_notes SET note = ?, updated_at = NOW() WHERE id = ?',
    [note, id],
    (err, result) => {
      if (err) {
        console.error('Error updating note:', err.message);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      // Return updated record
      db.query('SELECT * FROM schedule_notes WHERE id = ?', [id], (err2, rows) => {
        if (err2) {
          console.error('Error fetching updated note:', err2.message);
          return res.status(500).json({ error: err2.message });
        }
        res.json(rows[0]);
      });
    }
  );
});

/* ------------------- DELETE a note ------------------- */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM schedule_notes WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting note:', err.message);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ success: true });
  });
});

export default router;
