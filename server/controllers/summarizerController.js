
const huggingface = require('./hfController');
var qs = require('querystring');

const getSummary = async (req, res) => {
  console.log("Sending request to Hugging Face API.")
  const text = req.body.text;

  let result;
  try {
    result = await huggingface.huggingfaceAPI({ "inputs": text });
    res.json(result.data[0]["summary_text"]);
  } catch (err) {
    const message = `failed summary api due to ${err}`
    console.error(message)

    return res.status(400).send({
      message: message
    });
  }
}


module.exports = {
  getSummary
};
