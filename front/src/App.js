import React from 'react';
import UploadButton from './components/uploads/UploadButton';
import UrlBar from './components/uploads/UrlBar';
import Dragndrop from './components/uploads/Dragndrop';

import Header from './components/static/Header';
import Introduction from './components/Introduction';
import LimitWords from './components/LimitWords';
import ShareButtons from './components/ShareButtons';
import Summarization from './components/Summarization';
import Summarize from './components/Summarize';
import usePost from './hooks/usePost';
function App() {

  const { setFile,
    setUrl, message,
    fetchInProgress, setFetchInProgress,
    summary, post } = usePost()

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
