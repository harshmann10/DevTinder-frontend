import { useEffect, useState } from "react";
import api from "../../utils/apiAxios";
import { useSelector } from "react-redux";

const ForgotPasswordUsingEmailId = () => {
    const [emailId, setEmailId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showtoast, setShowToast] = useState(false);
    const user = useSelector((store) => store.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await api.post("/profile/forgot-password", {
                emailId,
            });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

            setCountdown(30);
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsSubmitting(false);
                        return 0;
                    } else {
                        return prevCountdown - 1;
                    }
                });
            }, 1000);
        } catch (err) {
            setIsSubmitting(false);
            setCountdown(0);
        }
    };

    useEffect(() => {
        if (user && user.emailId) {
            setEmailId(user.emailId);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center text-gray-400 min-h-[80vh]">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-200">
                <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                        <label className="block">Email Id</label>
                        <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                            placeholder="Enter your email Id"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? countdown > 0
                                ? `Resend in ${countdown} seconds`
                                : "Sending..."
                            : "Submit"}
                    </button>
                </form>
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
                        <span>Password reset email sent successfully!</span>{" "}
                        {/* Corrected message */}
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

export default ForgotPasswordUsingEmailId;
