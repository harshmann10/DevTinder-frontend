import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body, Login, Profile, Feed } from "./components";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="" element={<Feed />} />
              <Route path="login" element={<Login />}></Route>
              <Route path="profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
