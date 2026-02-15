import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import api from "../utils/apiAxios";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await api.post("/request/review/" + status + "/" + _id);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await api.get("/user/requests/received");
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests && requests.length === 0)
    return (
      <h1 className="mt-10 text-center text-2xl font-semibold text-gray-500">
        No requests found
      </h1>
    );

  return (
    <div className="text-center w-full mt-5">
      <h1 className="font-bold text-3xl mb-7">Connections Requests</h1>
      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
          socialLinks,
        } = request.fromUserId;
        return (
          <div
            key={_id}
            className="container bg-base-300 m-4 p-4 rounded-lg flex w-3/4 mx-auto gap-2"
          >
            <img
              className="w-32 h-32 object-cover rounded-full"
              src={photoUrl}
              alt="photo"
            />
            <div className="text-left mx-4 grow">
              <h2 className="font-bold text-xl mb-1">
                {firstName + " " + lastName}
              </h2>
              <p className="mb-0.5">{age + ", " + gender}</p>
              <p>{about}</p>
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
            </div>
            <div className="flex flex-row justify-center items-center gap-5">
              <button
                className="btn btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;
