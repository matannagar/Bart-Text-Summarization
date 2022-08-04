
const huggingface = require('./hfController');


const getSummary = async (req, res) => {
  const text = req.query.text;
  console.log(req.query);
  let result;
  try {
    result = await huggingface.huggingfaceAPI({ inputs: text });
    res.json(result.data);
  } catch (err) {
    console.error(`failed summary api due to ${err.message}`)
  }

}


module.exports = {
  getSummary
};
