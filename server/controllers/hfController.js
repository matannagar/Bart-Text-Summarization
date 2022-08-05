const axios = require('axios');
require("dotenv").config();

const api = {
    key: process.env.HF_KEY,
    base: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
}

async function huggingfaceAPI(data) {
    return axios({
        method: 'post',
        url: api.base,
        headers: { Authorization: "Bearer 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" },
        data: data,
    })
}

module.exports = {
    huggingfaceAPI
}


