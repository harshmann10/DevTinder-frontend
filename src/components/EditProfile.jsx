import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import api from "../utils/apiAxios";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice"; 
import { removeConnection } from "../utils/connectionSlice"; 
import { clearRequests } from "../utils/requestSlice"; 

function EditProfile({ user, setHideChangePassword }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills || []);
    const [error, setError] = useState("");
    const [showtoast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [deleteToast, setDeleteToast] = useState({ show: false, message: "", type: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const saveProfile = async () => {
        setError("");
        try {
            const res = await api.patch("/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl,
                skills,
            });
            dispatch(addUser(res.data?.data));
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
                clearTimeout(timer);
            }, 3000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete("/profile/delete");
            dispatch(removeUser());
            dispatch(removeFeed());
            dispatch(removeConnection());
            dispatch(clearRequests());
            setDeleteToast({ show: true, message: "Your account has been deleted successfully!", type: "success" });
            const timer = setTimeout(() => {
                setDeleteToast({ show: false, message: "", type: "" });
                navigate("/");
                clearTimeout(timer);
            }, 3000);
        } catch (err) {
            setDeleteToast({ show: true, message: "Failed to delete account: " + err.response?.data || err.message, type: "error" });
            const timer = setTimeout(() => {
                setDeleteToast({ show: false, message: "", type: "" });
                clearTimeout(timer);
            }, 3000);
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-14 my-2 px-4">
            <div className="card bg-base-300 w-full max-w-md md:w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your First Name here"
                                className="input input-bordered w-full max-w-xs"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Last Name here"
                                className="input input-bordered w-full max-w-xs"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Age here"
                                className="input input-bordered w-full max-w-xs"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select
                                className="input input-bordered w-full max-w-xs"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">--Please choose an option--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Photo URL here"
                                className="input input-bordered w-full max-w-xs"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Skills</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Skills"
                                className="input input-bordered w-full max-w-xs"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value.split(","))}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <textarea
                                rows={2}
                                placeholder="Enter your About here"
                                className="textarea textarea-bordered"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                    </div>
                    <p className="text-red-500 text-sm text-center">{error}</p>
                    <div className="flex flex-col gap-3 justify-center mt-2">
                        <div className="card-actions justify-center gap-5">
                            <button className="btn btn-primary" onClick={saveProfile}>
                                Save Profile
                            </button>
                            <button
                                className="btn btn-outline btn-primary"
                                onClick={() => setHideChangePassword(false)}
                            >
                                Change Password
                            </button>
                        </div>
                        <div className="card-actions justify-center">
                            <button
                                className="btn btn-error btn-outline"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-md md:w-96 self-start">
                <UserCard
                    user={{ firstName, lastName, age, gender, about, photoUrl, skills }}
                    actionsDisabled={true}
                />
            </div>
            {showtoast && (
                <div className="toast toast-top toast-center">
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
                        <span>Your Profile data has been saved successfully!</span>
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
            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Account Deletion</h3>
                        <p className="py-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={handleDeleteAccount}>Delete</button>
                            <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {deleteToast.show && (
                <div className="toast toast-top toast-center">
                    <div className={`alert alert-${deleteToast.type}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            {deleteToast.type === "success" ? (
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
                        <span>{deleteToast.message}</span>
                        <button
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-gray-800"
                            onClick={() => setDeleteToast({ show: false, message: "", type: "" })}
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
}

export default EditProfile;
