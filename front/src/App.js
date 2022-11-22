import React from 'react';
import UploadButton from './components/uploads/UploadButton';
import UrlBar from './components/uploads/UrlBar';
import Dragndrop from './components/uploads/Dragndrop';

import Header from './components/static/Header';
import Introduction from './components/static/Introduction';
import LimitWords from './components/LimitWords';
import ShareBar from './components/ShareBar';
import Summarization from './components/Summarization';
import Summarize from './components/Summarize';
import usePost from './hooks/usePost';
import History from './components/History';

function App() {

  const { setFile,
    setUrl, message,
    fetchInProgress,
    summary, post } = usePost()

  return (
    <div className="App">
      <Header />
      <Introduction />
      <div className='container'>
        <div className='right'>
          <UploadButton setFile={setFile} />
          <UrlBar setUrl={setUrl} />
          <Dragndrop setFile={setFile} />
          <LimitWords />
          <Summarize handleSubmit={post} />
        </div>
        <div className='left'>
          <div id="top-padding"></div>
          <History summary={summary} />
        </div>
      </div>
      <Summarization
        fetchInProgress={fetchInProgress}
        summary={summary}
        message={message} />
      <ShareBar text={summary} />
    </div>
  );
}

export default App;
