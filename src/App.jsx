import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/App.scss";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/infoplaylist" element={<Home />} />
          <Route path="/like" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
