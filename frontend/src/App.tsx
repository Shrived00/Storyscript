import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScren";
import MainScreen from "./screens/MainScreen";
import GlobalScreen from "./screens/GlobalScreen";
import SinglePostScreen from "./screens/SinglePostScreen";
import Navbar from "./components/Navbar";
import PostScreen from "./screens/PostScreen";
import EditScreen from "./screens/EditScreen";
import PostProflieScreen from "./screens/PostProflieScreen";
import MyProfileScreen from "./screens/MyProfileScreen";

function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/main" element={<MainScreen />} />
            <Route path="/global" element={<GlobalScreen />} />
            <Route path="/blog/:id" element={<SinglePostScreen />} />
            <Route path="/post" element={<PostScreen />} />
            <Route path="/edit/:id" element={<EditScreen />} />
            <Route path="/myprofile/create" element={<PostProflieScreen />} />
            <Route path="/profile/:userId" element={<MyProfileScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
