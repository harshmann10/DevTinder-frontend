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
            {/* PUBLIC ROUTES */}
            <Route path="" element={user ? <Feed /> : <HomePage />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="cancellation-and-refund" element={<CancellationAndRefund />} />
            <Route path="shipping-And-delivery" element={<ShippingAndDelivery />} />
            {/* AUTH ROUTES (Redirect to Home if already logged in) */}
            <Route path="login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
            <Route path="forgot-password" element={user ? <Navigate to="/" replace /> : <ForgotPassword />} />
            {/* PROTECTED ROUTES (Redirect to Login if not logged in) */}
            <Route path="profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="connections" element={user ? <Connections /> : <Navigate to="/login" replace />} />
            <Route path="requests" element={user ? <Requests /> : <Navigate to="/login" replace />} />
            <Route path="premuim" element={user ? <Premium /> : <Navigate to="/login" replace />} />
            <Route path="chat/:targetUserId" element={user ? <Chat /> : <Navigate to="/login" replace />} />
            {/* CATCH ALL */}
            <Route path="*" element={user ? <Feed /> : <HomePage />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
