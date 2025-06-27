import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="mt-10 text-center text-2xl font-semibold text-gray-500">
        No requests found
      </h1>
    );

  return (
    <div className="text-center mt-5">
      <h1 className="font-bold text-3xl mb-7">Connections Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="container bg-base-300 m-4 p-4 rounded-lg flex w-3/4 mx-auto"
          >
            <img
              className="w-32 h-32 object-cover rounded-full"
              src={photoUrl}
              alt="photo"
            />
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl mb-1">
                {firstName + " " + lastName}
              </h2>
              <p className="mb-0.5">{age + ", " + gender}</p>
              <p>{about}</p>
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
