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
  const api = "http://localhost:3000/api/parser"
  // const api = "http://localhost:3000/upload"


  const [file, setFile] = useState(null)
  const [text, setText] = useState('')

  const handleChange = event => {
    const fileUploaded = event.target.files[0]
    setFile(fileUploaded)
  }

  const handleDragChange = file => {
    setFile(file)
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
      // axios.post("https://httpbin.org/anything", formData).then(res => console.log(res)).catch(err => console.log(err))
      const response = await axios.post(api, formData, config)
        .then(res => setText(res.data))
      console.log(text)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <Header />
      <Introduction />
      <UploadButton
        handleChange={handleChange} />
      {/* <Dragndrop
        setFile={setFile}
        handleChange={handleDragChange} /> */}
      <LimitWords />
      <Summarize handleOnSubmit={handleOnSubmit} />
      <Summarization />
      <ShareButtons />
    </div>
  );
}

export default App;
