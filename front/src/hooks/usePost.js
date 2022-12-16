import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../data/api';
/**
 * usePost is a custom React hook that provides functionality for uploading a file or a URL,
 * parsing the file or URL, and generating a summary of the parsed content.
 *
 * @return {object} An object with the following properties:
 *                  - file: The file that was selected by the user.
 *                  - setFile: A function for updating the file.
 *                  - url: The URL that was entered by the user.
 *                  - setUrl: A function for updating the URL.
 *                  - message: A message that is displayed to the user.
 *                  - setMessage: A function for updating the message.
 *                  - fetchInProgress: A boolean value indicating whether a fetch operation is in progress.
 *                  - setFetchInProgress: A function for updating the fetchInProgress value.
 *                  - summary: The summary of the parsed content.
 *                  - setSummary: A function for updating the summary.
 *                  - post: A function for uploading a file or URL, parsing it, and generating a summary.
 */
function usePost() {
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('')

    const [message, setMessage] = useState('')
    const [fetchInProgress, setFetchInProgress] = useState(false)
    const [summary, setSummary] = useState('')

    useEffect(() => {
        if (file) setMessage('A file has been chosen!')
    }, [file])

    /**
     * post is a function for uploading a file or URL, parsing it, and generating a summary.
     * It uses the axios library to make HTTP requests to the specified API endpoints.
     * It updates the state variables as needed to reflect the progress and result of the operation.
     */
    const post = async () => {
        setSummary('')
        setMessage('')
        if (file || url) {
            setFetchInProgress(true)
            const formData = new FormData()
            let config
            if (file) {
                formData.append('file', file)
                config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            } else {
                formData.append('url', url)
                config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
            await axios.post(file ? api.parser : api.webParser, formData, config)
                .then(async (res) => {
                    formData.delete(file ? 'file' : 'url')
                    formData.append('text', res.data)
                    return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
                })
                .then(res => {
                    setSummary(res.data)
                }).catch((error) => {
                    setMessage('An error has occurred!')
                    console.log(error)
                })
                .finally(() => {
                    setFile(null)
                    setUrl('')
                    setFetchInProgress(false)
                })
        } else {
            setMessage('Please pick a file or url!')
        }
    }

    return {
        file, setFile,
        url, setUrl,
        message, setMessage,
        fetchInProgress, setFetchInProgress,
        summary, setSummary, post
    }
}

export default usePost
