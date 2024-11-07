import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "./dailybee/pages/Landingpage";
import CheckOut from "./dailybee/pages/CheckOut";
import MainPage from "./dailybee/components/MainPage/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/home" element={<Landingpage />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </Router>
  );
}

export default App;
