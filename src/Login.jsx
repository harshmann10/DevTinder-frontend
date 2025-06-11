import { useState } from "react";
import axios from "axios";

function Login() {
  const [emailId, setEmailId] = useState("narender@gmail.com");
  const [password, setPassword] = useState("narenderPassword@1");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs mb-3">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                placeholder="Type Email Id here"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs mb-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Type Password here"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Log-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;