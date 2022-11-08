import Dragndrop from "./components/uploads/Dragndrop";
import UploadButton from "./components/uploads/UploadButton";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import LimitWords from "./components/LimitWords";
import ShareButtons from "./components/ShareButtons";
import Summarization from "./components/Summarization";
import Summarize from "./components/Summarize";
import { useState } from "react";
import axios from 'axios';
import UrlBar from "./components/UrlBar";

function App() {
  const api = {
    parser: "http://localhost:3000/api/parser",
    webParser: "http://localhost:3000/api/webparser",
    summarizer: "http://localhost:3000/api/summarize"
  }
  const [error, setMessage] = useState('')
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')

  const handleChange = event => {
    console.log("File loaded via file button")
    const fileUploaded = event.target.files[0]
    setFile(fileUploaded)
    setSummary('')
    setMessage('A file has been chosen!')
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setFetchInProgress(true)
    setSummary('')
    setError(false)
    const formData = new FormData()

    if (file) {
      formData.append("file", file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      try {
        await axios.post(api.parser, formData, config)
          .then(async (res) => {
            formData.delete("file")
            formData.append("text", res.data)
            return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
          })
          .then(res => {
            setFetchInProgress(false)
            setSummary(res.data)
            setFile(null)
          })
      } catch (error) {
        setFetchInProgress(false)
        setError(true)
        console.log("An error has occurred!")
        console.log(error)
      }
    } else {
      console.log("in url")
      console.log(url)
      formData.append("url", url)
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        await axios.post(api.webParser, formData, config)
          .then(async (res) => {
            formData.delete("url")
            formData.append("text", res.data)
            return await axios.post(api.summarizer, formData, { ...config, headers: { 'Content-Type': 'application/json' } })
          })
          .then(res => {
            setFetchInProgress(false)
            setSummary(res.data)
            setUrl('')
          })
      } catch (error) {
        setFetchInProgress(false)
        setError(true)
        console.log("An error has occurred!")
        console.log(error)
      }
    }
  }


  return (
    <div className="App">
      <Header />
      <Introduction />
      <UploadButton handleChange={handleChange} setSummary={setSummary} />
      <UrlBar setUrl={setUrl} />
      <Dragndrop setFile={setFile} setSummary={setSummary} />
      <LimitWords />
      <Summarize handleOnSubmit={handleOnSubmit} file={file} />
      <Summarization
        fetchInProgress={fetchInProgress}
        result={summary}
        error={error} />
      <ShareButtons text={summary} />
    </div>
  );
}

export default App;
