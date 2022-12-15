const express = require('express')

const router = express.Router();
const bartSummarizer = require('../controllers/summarizer')
const pyParser = require('../controllers/parser')
const fileHandler = require('../middlewares/handleFile')

router.post("/summarize", bartSummarizer.getSummary)
router.post("/parser", fileHandler.upload.single("file"), pyParser.parse)
router.post("/webparser", pyParser.webParser)

module.exports = router;
