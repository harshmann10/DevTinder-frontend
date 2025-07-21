import { useEffect, useState } from "react";
import api from "../../utils/apiAxios";
import { useNavigate } from "react-router-dom";

const Toast = ({ message, type, onClose }) => (
    <div className="toast toast-top toast-center z-50">
        <div
            className={`alert ${type === "success" ? "alert-success" : "alert-error"
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                {type === "success" ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                )}
            </svg>
            <span>{message}</span>
            <button
                className="btn btn-sm btn-circle btn-ghost text-error hover:bg-gray-800"
                onClick={onClose}
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
);

const ForgotPassword = () => {
    const [activeTab, setActiveTab] = useState("email"); // 'email' or 'otp'
    const navigate = useNavigate();

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [emailId, setEmailId] = useState("");
    const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
    const [emailCountdown, setEmailCountdown] = useState(0);

    const [otpEmailId, setOtpEmailId] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [newPasswordOtp, setNewPasswordOtp] = useState("");
    const [confirmPasswordOtp, setConfirmPasswordOtp] = useState("");
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [otpCountdown, setOtpCountdown] = useState(0);
    const [otpError, setOtpError] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast((prev) => ({ ...prev, show: false }));
                if (
                    toast.type === "success" &&
                    toast.message.includes("Password reset successfully")
                ) {
                    navigate("/login");
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast, navigate]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (isEmailSubmitting) {
            return;
        }

        setIsEmailSubmitting(true);

        try {
            const res = await api.post("/profile/forgot-password/email", {
                emailId,
            });
            setToast({ show: true, message: res.data.message, type: "success" });

            setEmailCountdown(30);
            const timer = setInterval(() => {
                setEmailCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsEmailSubmitting(false);
                        return 0;
                    } else {
                        return prevCountdown - 1;
                    }
                });
            }, 1000);
        } catch (err) {
            setEmailCountdown(0);
            setToast({
                show: true,
                message:
                    err.response?.data?.message ||
                    "An internal error occurred. Please try again later.",
                type: "error",
            });
            console.error("Email link submission error:", err);

            setTimeout(() => {
                setIsEmailSubmitting(false);
            }, 3000);
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (isSendingOtp) return;

        setOtpError("");
        setIsSendingOtp(true);

        try {
            const res = await api.post("/profile/forgot-password/otp", {
                emailId: otpEmailId,
            });
            setToast({
                show: true,
                message: res.data.message || "OTP sent to your email.",
                type: "success",
            });
            setIsOtpSent(true);

            setOtpCountdown(60);
            const timer = setInterval(() => {
                setOtpCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsSendingOtp(false);
                        return 0;
                    } else {
                        return prevCountdown - 1;
                    }
                });
            }, 1000);
        } catch (err) {
            setOtpCountdown(0);
            setToast({
                show: true,
                message: err.response?.data?.message || "Failed to send OTP.",
                type: "error",
            });

            setTimeout(() => {
                setIsSendingOtp(false);
            }, 3000);
        }
    };

    const handleVerifyOtpAndReset = async (e) => {
        e.preventDefault();
        if (newPasswordOtp !== confirmPasswordOtp) {
            return setOtpError("Passwords do not match.");
        }
        if (isVerifyingOtp) return;

        setOtpError("");
        setIsVerifyingOtp(true);

        try {
            const res = await api.post("/profile/forgot-password/otp-verify", {
                emailId: otpEmailId,
                otp: otpCode,
                newPassword: newPasswordOtp,
            });
            setToast({
                show: true,
                message: res.data.message || "Password reset successfully!",
                type: "success",
            });
            setOtpCode("");
            setNewPasswordOtp("");
            setConfirmPasswordOtp("");
            setIsOtpSent(false);
        } catch (err) {
            setToast({
                show: true,
                message: err.response?.data?.message || "Failed to reset password.",
                type: "error",
            });
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    return (
        <div className="flex items-center justify-center text-gray-400 min-h-[80vh]">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-200">
                <h1 className="text-3xl font-bold text-center">Forgot Password</h1>

                <div role="tablist" className="tabs tabs-boxed mt-6 mb-4">
                    <a
                        role="tab"
                        className={`tab ${activeTab === "email" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("email")}
                    >
                        Email Link
                    </a>
                    <a
                        role="tab"
                        className={`tab ${activeTab === "otp" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("otp")}
                    >
                        OTP
                    </a>
                </div>

                {activeTab === "email" && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4 mt-6">
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
                            disabled={isEmailSubmitting}
                        >
                            {isEmailSubmitting
                                ? emailCountdown > 0
                                    ? `Resend in ${emailCountdown} seconds`
                                    : "Sending..."
                                : "Submit"}
                        </button>
                    </form>
                )}

                {activeTab === "otp" && (
                    <form
                        onSubmit={isOtpSent ? handleVerifyOtpAndReset : handleSendOtp}
                        className="space-y-4 mt-6"
                    >
                        <div>
                            <label className="block">Email Id</label>
                            <input
                                type="email"
                                value={otpEmailId}
                                onChange={(e) => setOtpEmailId(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                                placeholder="Enter your email Id"
                                required
                                disabled={isOtpSent}
                            />
                        </div>

                        {!isOtpSent && (
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                                disabled={isSendingOtp}
                            >
                                {isSendingOtp
                                    ? otpCountdown > 0
                                        ? `Resend in ${otpCountdown} seconds`
                                        : "Sending OTP..."
                                    : "Send OTP"}
                            </button>
                        )}

                        {isOtpSent && (
                            <>
                                <div>
                                    <label className="block">OTP Code</label>
                                    <input
                                        type="text"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                                        placeholder="Enter OTP"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block">New Password</label>
                                    <input
                                        type="password"
                                        value={newPasswordOtp}
                                        onChange={(e) => setNewPasswordOtp(e.target.value)}
                                        className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPasswordOtp}
                                        onChange={(e) => setConfirmPasswordOtp(e.target.value)}
                                        className="w-full p-2 mt-1 border border-gray-500 rounded-md focus:outline-none outline-none "
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>
                                <p className="text-red-500 text-sm min-h-[1.25rem] text-center mb-1">
                                    {otpError}
                                </p>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                                    disabled={isVerifyingOtp}
                                >
                                    {isVerifyingOtp ? "Verifying..." : "Reset Password"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="w-full mt-2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                                    disabled={isSendingOtp || otpCountdown > 0}
                                >
                                    {otpCountdown > 0
                                        ? `Resend OTP in ${otpCountdown}s`
                                        : "Resend OTP"}
                                </button>
                            </>
                        )}
                    </form>
                )}

                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
                    />
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
