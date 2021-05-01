const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/consulta1', async (req, res) => {
  try {
    let filters = {};
    filters = {publicados: {$gte: 20}, pais: {$eq:"Colombia"}};
    const authors = await Author.find(filters,{nombre: 1,apellido: 1,_id: 0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/consulta2', async (req, res) => {
  try {
    let filters = {};
    filters = {apellido: {$exists:true}};
    const authors = await Author.find(filters,{nombre: 1,_id: 0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/consulta3', async (req, res) => {
  try {
    let filters = {};
    filters = {$or:[{publicados: {$gt: 20}}, {pais: {$eq:"Argentina"}}]};
    const authors = await Author.find(filters,{apellido: 1,_id: 0});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
