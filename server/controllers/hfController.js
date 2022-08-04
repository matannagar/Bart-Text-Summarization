const axios = require('axios');
require("dotenv").config();
const api = {
    key: process.env.HF_KEY,
    base: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
}

async function huggingfaceAPI(data) {
    const response = await axios.get(
        api.base,
        {
            headers: { Authorization: `Bearer ${api.key}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    return response;
}

module.exports = {
    huggingfaceAPI
}
