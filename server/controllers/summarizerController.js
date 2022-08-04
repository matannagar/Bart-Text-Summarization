
const huggingface = require('./hfController');
var qs = require('querystring');

const getSummary = async (req, res) => {
  console.log(req.body.text)

  // console.log(req.method);

  // let result;
  // try {
  //   result = await huggingface.huggingfaceAPI({ inputs: text });
  //   res.json(result.data);
  // } catch (err) {
  //   console.error(`failed summary api due to ${err.message}`)
  // }

}


module.exports = {
  getSummary
};
