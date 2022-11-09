import { useState } from 'react'
import axios from 'axios'
import { api } from './data/api';

function usePost({ file, url }) {
    const [message, setMessage] = useState('')
    const [fetchInProgress, setFetchInProgress] = useState(false)
    const [summary, setSummary] = useState('')

    const post = async function () {
        console.log('in here')
        setFetchInProgress(true)
        setSummary('')
        setMessage(false)
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
                setFetchInProgress(false)
                setSummary(res.data)
            }).catch((error) => {
                setMessage(true)
                console.log('An error has occurred!')
                console.log(error)
            })
            .finally(() => {
                setFetchInProgress(false)
            })
    }

    return [message, setMessage,
        fetchInProgress, setFetchInProgress,
        summary, setSummary, post]
}

export default usePost
