import Dragndrop from "./components/Dragndrop";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import LimitWords from "./components/LimitWords";
import ShareButtons from "./components/ShareButtons";
import Summarization from "./components/Summarization";
import Summarize from "./components/Summarize";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
      <Header />
      <Introduction />
      <Upload />
      <Dragndrop />
      <LimitWords />
      <Summarize />
      <Summarization />
      <ShareButtons />
    </div>
  );
}

export default App;
