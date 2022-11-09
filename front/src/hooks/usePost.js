import React, { useEffect, useState } from 'react'
import axios from 'axios'
function usePost(url) {
    const [error, setError] = useState(false)
    const [fetchInProgress, setFetchInProgress] = useState(false)
    const [summary, setSummary] = useState('')

    useEffect(() => {
        axios.post(url, formData, config)
            .then(async (res) => {
                formData.delete('file')
                formData.append('text', res.data)
                return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
            })
            .then(res => {
                setSummary(res.data)
                setFile(null)
            }).catch((err) => {
                setError(true)
                console.log('An error has occurred!')
                console.log(error)
            }).finally(() => {
                setFetchInProgress(false)
            })
    }, [url])

    return [summary, setSummary, fetchInProgress, setFetchInProgress, error, setError]
}

export default usePost
