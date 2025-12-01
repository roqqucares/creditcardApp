import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../index.css";
import CreditCardPage from "./pages/CreditCardPage";
import OtpPage from "./pages/OtpPage";
import Success from "./pages/Success";
import ReservationPage from "./pages/ReservationPage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<ReservationPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<CreditCardPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
