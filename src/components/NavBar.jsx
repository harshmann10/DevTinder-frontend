// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnection } from "../utils/connectionSlice";
import { clearRequests } from "../utils/requestSlice";
import api from "../utils/apiAxios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnection());
      dispatch(clearRequests());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl ">
          <img src="/icon.svg" alt="icon" />
          <span className="text-white">DevTinder</span>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-3 text-xl">
          <p>Welcome, {user.firstName} </p>
          <div className="dropdown dropdown-end mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="profile" className="justify-between">
                  Profile <span className="badge">🙎🏻‍♂️</span>
                </Link>
              </li>
              <li>
                <Link to="connections">
                  Conncections <span className="badge">💗</span>
                </Link>
              </li>
              <li>
                <Link to="requests">
                  Requests <span className="badge">👁️</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
