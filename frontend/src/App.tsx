import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostScreen from './screens/PostScreen';
import GlobalScreen from './screens/GlobalScreen';
import MainScreen from './screens/MainScreen';
import SinglePostScreen from './screens/SinglePostScreen';
import EditScreen from './screens/EditScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import PostProfileScreen from './screens/PostProfileScreen';

const App: React.FC = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/post" element={<PostScreen />} />
          <Route path="/global" element={<GlobalScreen />} />
          <Route path="/:id" element={<SinglePostScreen />} />
          <Route path="/edit/:id" element={<EditScreen />} />
          <Route path="/myprofile" element={<MyProfileScreen />} />
          <Route path="/myprofile/create" element={<PostProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
