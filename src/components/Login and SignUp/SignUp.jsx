import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");
        try {
            const res = await api.post("/signup", {
                firstName,
                lastName,
                emailId,
                password,
            });
            dispatch(addUser(res.data.data));
            return navigate("/profile", { state: { mode: "edit" } });
        } catch (err) {
            setError(err.response?.data || "Signup failed");
            console.error("Signup error:", err);
        }
    };

    return (
        <div className="flex justify-center my-12">
            <div className="card bg-base-300 w-[450px] shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign-Up</h2>
                    <label className="form-control w-full max-w-sm mb-3">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            className="input input-bordered w-full max-w-sm"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-sm mb-3">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="input input-bordered w-full max-w-sm"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-sm mb-3">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Enter Email Id"
                            className="input input-bordered w-full max-w-sm"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-sm">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <div className="relative w-full max-w-sm">
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
                                    <FaEyeSlash className="h-5 w-5" />
                                ) : (
                                    <FaEye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </label>
                    <p className="text-red-500 text-sm min-h-[1.25rem] text-center mb-1">
                        {error}
                    </p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleSignup}>
                            Sign-up
                        </button>
                    </div>
                    <p
                        className=" text-sm mt-1 link link-hover m-auto"
                        onClick={() => navigate("/login")}
                    >
                        Existing user? Log in
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
