import React, { useEffect, useState } from 'react'
import axios from 'axios'
function usePost({ file, url, api }) {
    const [message, setMessage] = useState('')
    const [summary, setSummary] = useState('')
    const [fetchInProgress, setFetchInProgress] = useState(false)

    const formData = new FormData()
    let config
    useEffect(async () => {
        setFetchInProgress(true)
        setSummary('')
        setMessage(false)

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
    }, [file, url])

    return [message, setMessage, summary, setSummary, fetchInProgress, setFetchInProgress]
}

export default usePost
