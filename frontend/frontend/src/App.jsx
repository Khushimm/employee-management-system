import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Employee from "./pages/employee";
import Leave from "./pages/leave";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/leaves" element={<Leave />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
