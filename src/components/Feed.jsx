// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { removeUser } from "../utils/userSlice";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();

  const getFeed = async () => {
    try {
      const res = await api.get("/user/feed");
      dispatch(addFeed(res.data.data));
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(removeUser());
        return navigate("/login");
      }
      console.error("Failed to fetch feed:", err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (feed && feed.length <= 0)
    return (
      <h1 className="mt-10 text-center text-2xl font-semibold text-gray-500">
        No new User found!
      </h1>
    );

  return (
    feed &&
    feed.length > 0 && (
      <div className="flex justify-center mt-3">
        <div className="w-96">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
}

export default Feed;
