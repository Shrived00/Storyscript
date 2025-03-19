import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScren";
import MainScreen from "./screens/MainScreen";
import GlobalScreen from "./screens/GlobalScreen";

function App() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/main" element={<MainScreen />} />
            <Route path="/global" element={<GlobalScreen />} />
            {/* <Route path="/post" element={<PostScreen />} exact />
            <Route path="/:id" element={<SinglePostScreen />} exact />
            <Route path="/edit/:id" element={<EditScreen />} exact />
            <Route path="/myprofile" element={<MyProfileScreen />} exact />
            <Route
              path="/myprofile/create"
              element={<PostProflieScreen />}
              exact
            /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
