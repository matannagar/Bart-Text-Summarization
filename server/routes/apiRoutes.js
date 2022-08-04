const express = require('express')

const router = express.Router();
const bartSummarizer = require('../controllers/summarizerController')

router.post("/summarize", bartSummarizer.getSummary)

module.exports = router;
