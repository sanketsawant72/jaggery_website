const express = require('express');
const router  = express.Router();
const { createQuote, getQuotes } = require('../controllers/quoteController');

router.post('/', createQuote);  // POST /api/quotes
router.get('/',  getQuotes);    // GET  /api/quotes

module.exports = router;
