const axios = require('axios')
require('dotenv').config()

const api = {
	key: process.env.HF_KEY,
	base: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn'
}

const huggingfaceAPI = async (req, res) => {
	return await axios({
		method: 'post',
		url: api.base,
		headers: {Authorization: 'Bearer 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'},
		data: req
	})
		.then((resp) => {
			return resp
		})
		.catch((err) => `failed HF api due to ${err.message}`)
}

module.exports = {
	huggingfaceAPI
}
