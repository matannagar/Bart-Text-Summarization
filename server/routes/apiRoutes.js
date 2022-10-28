const express = require('express')

const router = express.Router();
const bartSummarizer = require('../controllers/summarizerController')
const pyParser = require('../controllers/parserController')
const fileHandler = require('../middlewares/handleFile')

router.post("/summarize", bartSummarizer.getSummary)
router.post("/parser", fileHandler.upload.single("file"), pyParser.parse)

module.exports = router;
