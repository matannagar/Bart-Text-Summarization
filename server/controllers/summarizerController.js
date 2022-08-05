
const huggingface = require('./hfController');
var qs = require('querystring');

const getSummary = async (req, res) => {
  const text = req.body.text;

  let result;
  try {
    result = await huggingface.huggingfaceAPI({ "inputs": text });
    res.json(result.data[0]["summary_text"]);
  } catch (err) {
    console.error(`failed summary api due to ${err.message}`)
  }
}


module.exports = {
  getSummary
};
