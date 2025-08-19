import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || '*';

app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

let items = [];
let idCounter = 1;

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const { name } = req.body;
    const newItem = { id: idCounter++, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const item = items.find(i => i.id == id);
    if (item) {
        item.name = name;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id == id);
    if (index > -1) {
        const deleted = items.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
