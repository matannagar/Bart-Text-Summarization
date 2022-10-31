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
          setSummary(res.data)
          setFile(null)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <Header />
      <Introduction />
      <UploadButton handleChange={handleChange} />
      <Dragndrop setFile={setFile} setSummary={setSummary} />
      <LimitWords />
      <Summarize handleOnSubmit={handleOnSubmit} />
      <Summarization result={summary} />
      <ShareButtons />
    </div>
  );
}

export default App;
