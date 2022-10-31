const axios = require('axios')
var FormData = require('form-data')
var fs = require('fs')
const { promisify } = require('util')

require('dotenv').config()

const unlinkAsync = promisify(fs.unlink)
const api = {
    base: 'http://127.0.0.1:5000/plaintext',
}

const parse = (async (req, res) => {
    const form = new FormData()
    const request_config = {
        headers: {
            ...form.getHeaders(),
        },
    }
    try {
        const pathToFile = `Files/${req.file.filename}`
        form.append('file', fs.createReadStream(pathToFile))
        return await axios.post(api.base, form, request_config)
            .then(resp => {
                res.send(resp.data)
                unlinkAsync(pathToFile)
            })
    } catch (error) {
        const message = `failed parser api due to ${error}`
        console.error(message)

        return res.status(400).send({
            message: message
        });
    }
})

module.exports = {
    parse,
}
