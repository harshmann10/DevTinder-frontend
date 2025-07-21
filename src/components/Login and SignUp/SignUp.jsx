import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apiAxios";

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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243-4.243-4.243"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
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
