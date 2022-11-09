import React from 'react';
import Dragndrop from './components/uploads/Dragndrop';
import UploadButton from './components/uploads/UploadButton';
import Header from './components/Header';
import Introduction from './components/Introduction';
import LimitWords from './components/LimitWords';
import ShareButtons from './components/ShareButtons';
import Summarization from './components/Summarization';
import Summarize from './components/Summarize';
import { useState } from 'react';
import UrlBar from './components/UrlBar';

function App() {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')

  const [message, setMessage,
    fetchInProgress, setFetchInProgress,
    summary, setSummary, post] = useState(file, url)

  return (
    <div className="App">
      <Header />
      <Introduction />
      <UploadButton setFile={setFile} setSummary={setSummary} setMessage={setMessage} />
      <UrlBar setUrl={setUrl} />
      <Dragndrop setFile={setFile} setSummary={setSummary} setMessage={setMessage} />
      <LimitWords />
      <Summarize onClick={console.log(1)} post={post} />
      <Summarization
        fetchInProgress={fetchInProgress}
        summary={summary}
        message={message} />
      <ShareButtons text={summary} />
    </div>
  );
}

export default App;
