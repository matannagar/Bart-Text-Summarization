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

function App() {
  const api = {
    parser: "http://localhost:3000/api/parser",
    summarizer: "http://localhost:3000/api/summarize"
  }
  const [error, setError] = useState(false)
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState('')

  const handleChange = event => {
    console.log("File loaded via file button")
    const fileUploaded = event.target.files[0]
    setFile(fileUploaded)
    setSummary('')
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setFetchInProgress(true)
    setSummary('')
    setError(false)
    const formData = new FormData()
    formData.append("file", file)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    try {
      const response = await axios.post(api.parser, formData, config)
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
  }

  return (
    <div className="App">
      <Header />
      <Introduction />
      <UploadButton handleChange={handleChange} setSummary={setSummary} />
      <Dragndrop setFile={setFile} setSummary={setSummary} />
      <LimitWords />
      <Summarize handleOnSubmit={handleOnSubmit} />
      <Summarization fetchInProgress={fetchInProgress} result={summary} error={error} />
      <ShareButtons />
    </div>
  );
}

export default App;
