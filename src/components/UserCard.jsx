// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import api from "../utils/apiAxios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user, className, actionsDisabled = false }) {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
        user;
    const handleSendRequest = async (status, userId) => {
        try {
            await api.post("/request/send/" + status + "/" + userId);
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error("Error sending request:", err);
        }
    };
    return (
        <div className={`card bg-base-300 w-96 shadow-xl ${className || ""}`}>
            <figure className="px-8 mx-5 max-h-80">
                <img src={photoUrl} alt="Photo" />
            </figure>
            <div className="card-body py-4">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age && gender && age + ", " + gender}</p>
                <p className="whitespace-normal break-words">{about}</p>
                {skills?.length > 0 && (
                    <div className="card-actions my-1 items-baseline">
                        <h3 className="font-semibold text-base">Skills:</h3>
                        {skills.map((skill, index) => (
                            <div key={index} className="badge badge-info badge-outline">
                                {skill.trim()}
                            </div>
                        ))}
                    </div>
                )}
                <div className="card-actions justify-center mt-2 gap-6">
                    <button
                        className="btn btn-success"
                        onClick={() =>
                            !actionsDisabled && handleSendRequest("interested", _id)
                        }
                    >
                        Interested
                    </button>
                    <button
                        className="btn btn-outline btn-error"
                        onClick={() =>
                            !actionsDisabled && handleSendRequest("ignored", _id)
                        }
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
