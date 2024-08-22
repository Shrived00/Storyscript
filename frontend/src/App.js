import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import PostScreen from './screens/PostScreen';
import SinglePostScreen from './screens/SinglePostScreen';
import GlobalScreen from './screens/GlobalScreen';
import EditScreen from './screens/EditScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import PostProflieScreen from './screens/PostProflieScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/main" element={<MainScreen />} exact />
          <Route path="/post" element={<PostScreen />} exact />
          <Route path="/global" element={<GlobalScreen />} exact />
          <Route path="/:id" element={<SinglePostScreen />} exact />
          <Route path="/edit/:id" element={<EditScreen />} exact />
          <Route path="/myprofile" element={<MyProfileScreen />} exact />
          <Route path="/myprofile/create" element={<PostProflieScreen />} exact />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
