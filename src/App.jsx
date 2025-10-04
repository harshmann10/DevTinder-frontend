import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Body,
  Login,
  Profile,
  Feed,
  Connections,
  Requests,
  HomePage,
  SignUp,
  ForgotPassword,
  ResetPassword,
  TermsOfService,
  ContactUs,
  PrivacyPolicy,
  CancellationAndRefund,
  ShippingAndDelivery,
  Chat,
  Premium,
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
            <Route
              path="login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="signup"
              element={user ? <Navigate to="/" replace /> : <SignUp />}
            />
            <Route
              path="forgot-password"
              element={user ? <Navigate to="/" replace /> : <ForgotPassword />}
            />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="cancellation-and-refund" element={<CancellationAndRefund />} />
            <Route path="shipping-And-delivery" element={<ShippingAndDelivery />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="premuim" element={<Premium />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
            <Route path="*" element={user ? <Feed /> : <HomePage />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
