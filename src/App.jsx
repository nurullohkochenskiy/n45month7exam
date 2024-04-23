import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/App.scss";
import Playlistinfo from "./pages/Playlistinfo";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/infoplaylist/:id" element={<Playlistinfo />} />
          <Route path="/like" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
