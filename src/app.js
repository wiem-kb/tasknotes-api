const express = require('express');

const app = express();
app.use(express.json());
 
let notes = [];
let nextId = 1;
 
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' });
});
 
app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { text } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Le champ "text" est obligatoire' });
  }
  const note = { id: nextId++, text };
  notes.push(note);
  res.status(201).json(note);
});
 
app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = notes.length;
  notes = notes.filter((n) => n.id !== id);
  if (notes.length === before) {
    return res.status(404).json({ error: 'Note introuvable' });
  }
  res.status(204).send();
});
 
module.exports = app;
