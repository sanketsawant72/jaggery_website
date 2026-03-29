const express = require('express');
const router  = express.Router();
const { createLead, getLeads } = require('../controllers/leadController');

router.post('/',   createLead);  // POST /api/leads
router.get('/',    getLeads);    // GET  /api/leads

module.exports = router;
