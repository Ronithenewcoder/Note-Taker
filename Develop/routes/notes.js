const router = express.Router();
const path = require('path');
const fs = require('fs');

const notesPath = path.resolve(__dirname, '../Develop/db/db.json');

router.get('/api/notes', (req, res) => {
    fs.readFile(notesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            let notes = JSON.parse(data) || [];
            res.json(notes);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(400).json({ error: 'Invalid JSON Format' });
        }
    });
});