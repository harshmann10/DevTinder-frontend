import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Body,
  Login,
  Profile,
  Feed,
  Connections,
  Requests,
  HomePage,
} from "./components";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="" element={user ? <Feed /> : <HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="*" element={user ? <Feed /> : <HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
