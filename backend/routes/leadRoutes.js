const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLead } = require('../controllers/leadController');

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .patch(updateLead);

module.exports = router;
