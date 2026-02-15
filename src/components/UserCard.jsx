import api from "../utils/apiAxios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function UserCard({ user, actionsDisabled = false }) {
    const dispatch = useDispatch();
    const {
        _id,
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
        skills,
        socialLinks,
    } = user;
    const handleSendRequest = async (status, userId) => {
        try {
            await api.post("/request/send/" + status + "/" + userId);
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error("Error sending request:", err);
        }
    };
    return (
        <div className={`card bg-base-300 shadow-xl`}>
            <figure className="px-8 mx-5 h-80 overflow-hidden rounded-lg">
                <img src={photoUrl} alt="Photo" className="w-full h-full object-cover" />
            </figure>
            <div className="card-body py-4">
                <h2 className="card-title items-baseline">
                    {`${firstName} ${lastName}`}
                    {age && gender && (
                        <span className="text-base font-normal ml-2">{`${age}, ${gender}`}</span>
                    )}
                </h2>
                <p className="whitespace-normal break-words">{about}</p>
                {skills?.length > 0 && (
                    <div className="card-actions my-1 items-baseline">
                        <h3 className="font-semibold text-base">Skills:</h3>
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="badge badge-outline text-white font-semibold"
                            >
                                {skill.trim().toUpperCase()}
                            </div>
                        ))}
                    </div>
                )}
                {socialLinks &&
                    (socialLinks.github ||
                        socialLinks.linkedin ||
                        socialLinks.twitter) && (
                        <div className="card-actions my-1 items-baseline flex-wrap">
                            <h3 className="font-semibold text-base">Social Links:</h3>
                            {socialLinks.github && (
                                <a
                                    href={socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-ghost btn-info"
                                    aria-label="GitHub Profile"
                                >
                                    <FaGithub size={24} />
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-ghost btn-info"
                                    aria-label="LinkedIn Profile"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a
                                    href={socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-ghost btn-info"
                                    aria-label="Twitter Profile"
                                >
                                    <FaTwitter size={24} />
                                </a>
                            )}
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
