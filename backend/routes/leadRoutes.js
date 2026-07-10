const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLead } = require('../controllers/leadController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protectAdmin, getLeads)
  .post(createLead);

router.route('/:id')
  .patch(protectAdmin, updateLead);

module.exports = router;
