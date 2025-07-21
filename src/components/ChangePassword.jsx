import { useState } from "react";
import api from "../utils/apiAxios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const ChangePassword = ({ setMode }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();

    const handlePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setError("New password and confirm password do not match.");
        }
        if (isSubmitting) return;
        setError("");
        setIsSubmitting(true);
        try {
            const res = await api.patch("profile/edit/password", {
                currentPassword,
                newPassword,
            });
            setMessage(res.data?.message);
            setShowToast(true);
            setTimeout(() => {
                dispatch(removeUser());
            }, 3000);
        } catch (error) {
            console.log(error);
            setError(error.response?.data || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="flex justify-center my-12">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Change Password</h2>
                    <label className="form-control w-full max-w-xs mb-3">
                        <div className="label">
                            <span className="label-text">Old Password</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Old Password"
                            className="input input-bordered w-full max-w-xs"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mb-3">
                        <div className="label">
                            <span className="label-text">New Password</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter New Password"
                            className="input input-bordered w-full max-w-xs"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mb-3">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            className="input input-bordered w-full max-w-xs"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <p className="text-red-500 text-sm min-h-[1.25rem] text-center mb-1">
                        {error}
                    </p>
                    <div className="card-actions justify-center gap-4">
                        <button
                            className="btn btn-primary"
                            onClick={handlePassword}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button className="btn btn-ghost" onClick={() => setMode("view")}>
                            Back to Profile
                        </button>
                    </div>
                </div>
            </div>
            {showtoast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{message}</span>
                        <button
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-gray-800"
                            onClick={() => setShowToast(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
