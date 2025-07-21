import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/apiAxios";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showtoast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match.");
        }
        if (isSubmitting) return;

        setError("");
        setIsSubmitting(true);

        try {
            const res = await api.post(`/profile/reset-password/${token}`, {
                newPassword,
            });
            setToastMessage(res.data.message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center my-12">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Reset Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">New Password</span>
                            </div>
                            <div className="relative w-full max-w-xs">
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="input input-bordered w-full pr-12"
                                    placeholder="Enter your new password"
                                    required
                                />
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Confirm New Password</span>
                            </div>
                            <input
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Confirm your new password"
                                required
                            />
                        </label>

                        <p className="text-red-500 text-sm min-h-[1.25rem] text-center mb-1">
                            {error}
                        </p>

                        <div className="card-actions justify-center pt-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
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
                        <span>{toastMessage}</span>
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

export default ResetPassword;
