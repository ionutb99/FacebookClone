import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register.js";
import { useEffect, useState } from "react";
import { UpdateProfileInfo } from "./helpers/UpdateProfileInfo";
import { EditPhotos } from "./helpers/EditPhotos";


function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );


  return (
    <Router>
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home  currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/profile/update-info/${currentUser?._id}`} element={<UpdateProfileInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path={`/photos/update/${currentUser?._id}`} element={<EditPhotos currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


