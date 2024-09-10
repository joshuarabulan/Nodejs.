const express = require('express');
const router = express.Router();

// In-memory database
let items = [];

// Routes
router.get('/', (req, res) => {
    res.render('index', { items });
});

router.get('/add', (req, res) => {
    res.render('edit', { item: null });
});

router.post('/add', (req, res) => {
    const { name } = req.body;
    items.push({ name, id: Date.now() });
    res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id == id);
    res.render('edit', { item });
});

router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    items = items.map(i => (i.id == id ? { ...i, name } : i));
    res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(i => i.id != id);
    res.redirect('/');
});

module.exports = router;
