import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { Footer } from "./components/footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register.js";
import { useState } from "react";
import { UpdateProfileInfo } from "./components/updateProfile/UpdateProfileInfo";
import { EditPhotos } from "./components/updateProfile/EditPhotos";
import { FriendProfile } from "./pages/FriendProfile";
import { Message } from "./pages/Message";


function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [friendId , setFriendId] = useState("");
  const [users, setUsers] = useState([]); 
  let [loading, setLoading] = useState(false);

  return (
    <Router>
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} loading={loading} setLoading={setLoading}  />
      <Routes>
        <Route path="/" element={<Home  currentUser={currentUser} setCurrentUser={setCurrentUser} setFriendId={setFriendId} users={users} setUsers={setUsers} loading={loading} setLoading={setLoading} />} />
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} loading={loading} setLoading={setLoading} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} setFriendId={setFriendId} loading={loading} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/message" element={<Message />} />
        <Route path={`/profile/update-info/${currentUser?._id}`} element={<UpdateProfileInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path={`/photos/update/${currentUser?._id}`} element={<EditPhotos currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path={`/user/${friendId}`} element={<FriendProfile currentUser={currentUser} friendId={friendId} setFriendId={setFriendId} users={users} setUsers={setUsers} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


