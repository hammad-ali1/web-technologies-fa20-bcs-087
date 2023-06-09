import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const navLinks = [
    {
      text: "Home",
      onClickHandler: () => {
        navigation("/admin");
      },
    },
    {
      text: "Login",
      onClickHandler: () => {
        navigation("/admin/login");
      },
    },
    {
      text: "Log Out",
      onClickHandler: () => {
        localStorage.removeItem("token");
        navigation("/admin/login");
      },
    },
  ];
  if (localStorage.getItem("token")) {
  }

  return (
    <div>
      <Navbar navLinks={navLinks} activeTab={activeTab} />
      <Routes>
        <Route path="/admin" element={<Home setActiveTab={setActiveTab} />} />
        <Route
          path="/admin/login"
          element={<Login setActiveTab={setActiveTab} />}
        />
      </Routes>
    </div>
  );
}

export default App;
