import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await api.get("/user/feed");
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (!feed) return null; // Simple guard clause

  if (feed.length === 0)
    return (
      <h1 className="mt-10 text-center text-2xl font-semibold text-gray-500">
        No new users found!
      </h1>
    );

  return (
    <div className="flex justify-center mt-3">
      <div className="w-96">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
}

export default Feed;
