import React from 'react';
import Dragndrop from './components/uploads/Dragndrop';
import UploadButton from './components/uploads/UploadButton';
import Header from './components/Header';
import Introduction from './components/Introduction';
import LimitWords from './components/LimitWords';
import ShareButtons from './components/ShareButtons';
import Summarization from './components/Summarization';
import Summarize from './components/Summarize';
import UrlBar from './components/UrlBar';
import usePost from './hooks/usePost';
function App() {

  const { file, setFile,
    url, setUrl, message, setMessage,
    fetchInProgress, setFetchInProgress,
    summary, setSummary, post } = usePost()

  return (
    <div className="App">
      <p>{setFetchInProgress}</p>
      <Header />
      <Introduction />
      <UploadButton setFile={setFile} />
      <UrlBar setUrl={setUrl} />
      <Dragndrop setFile={setFile} />
      <LimitWords />
      <Summarize handleSubmit={post} />
      <Summarization
        fetchInProgress={fetchInProgress}
        summary={summary}
        message={message} />
      <ShareButtons text={summary} />
    </div>
  );
}

export default App;
