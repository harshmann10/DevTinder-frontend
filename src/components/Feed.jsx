import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { removeUser } from "../utils/userSlice";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(removeUser());
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  return (
    feed && (
      <div className="flex justify-center mt-3">
        <UserCard user={feed.data[0]} />
      </div>
    )
  );
}

export default Feed;
