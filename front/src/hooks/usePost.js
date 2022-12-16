import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../data/api';

function usePost() {
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('')

    const [message, setMessage] = useState('')
    const [fetchInProgress, setFetchInProgress] = useState(false)
    const [summary, setSummary] = useState('')

    useEffect(() => {
        if (file) setMessage('A file has been chosen!')
    }, [file])

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
