import { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
import api from "../../utils/apiAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await api.post("/login", {
        emailId,
        password,
      });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs mb-3">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input
              type="email"
              placeholder="Enter Email Id"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <div className="relative w-full max-w-xs">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="input input-bordered w-full pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            <div className="label">
              <span
                className="text-sm mt-1 link link-hover"
                onClick={() => navigate("/forgot-password")}
              >
                Forget Password?
              </span>
            </div>
          </label>
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Log-in
            </button>
          </div>
          <p
            className=" text-sm mt-1 link link-hover m-auto"
            onClick={() => navigate("/signup")}
          >
            New user? Sign up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
