import React, { useEffect, useState } from 'react'
import axios from 'axios'
function usePost({ file, url, api }) {
    const [message, setMessage] = useState('')
    const [summary, setSummary] = useState('')
    const [fetchInProgress, setFetchInProgress] = useState(false)

    useEffect(async () => {
        setFetchInProgress(true)
        setSummary('')
        setMessage(false)
        const formData = new FormData()

        // if (file) {
        formData.append("file", file)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        await axios.post(api.parser, formData, config)
            .then(async (res) => {
                formData.delete("file")
                formData.append("text", res.data)
                return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
            })
            .then(res => {
                setFetchInProgress(false)
                setSummary(res.data)
            }).catch((error) => {
                setMessage(true)
                console.log("An error has occurred!")
                console.log(error)
            })
            .finally(() => {
                setFetchInProgress(false)
            })
        // } else {
        //     console.log("in url")
        //     console.log(url)
        //     formData.append("url", url)
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        //     await axios.post(api.webParser, formData, config)
        //         .then(async (res) => {
        //             formData.delete("url")
        //             formData.append("text", res.data)
        //             return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
        //         })
        //         .then(res => {
        //             setFetchInProgress(false)
        //             setSummary(res.data)
        //         }).catch((error) => {
        //             setMessage(true)
        //             console.log("An error has occurred!")
        //             console.log(error)
        //         })
        //         .finally(() => {
        //             setFetchInProgress(false)
        //         })
        // }
    }, [api])

    return [message, setMessage, summary, setSummary, fetchInProgress, setFetchInProgress]
}

export default usePost
