import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  const navigation = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigation("/login", { replace: true });
    }
  }, [navigation]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
