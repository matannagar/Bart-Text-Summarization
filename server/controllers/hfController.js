const axios = require('axios');
require("dotenv").config();

const api = {
    key: process.env.HF_KEY,
    base: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
}

async function huggingfaceAPI(data) {
    // console.log(data);
    // const response = await axios(
    //     api.base,
    //     {
    //         headers: { Authorization: "Bearer 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" },
    //         method: "POST",
    //         body: JSON.stringify(data),
    //     }
    // ).then((res) => {
    //     console.log((res.data));
    //     return res.data;
    // });

    axios({
        method: 'post',
        url: api.base,
        headers: { Authorization: "Bearer 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" },
        data: data,
    }).then((resp => {
        console.log(resp.data);
        return resp.data;
    }))

}

module.exports = {
    huggingfaceAPI
}


