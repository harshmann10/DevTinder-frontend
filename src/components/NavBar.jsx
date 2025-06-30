// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnection } from "../utils/connectionSlice";
import { removeRequest } from "../utils/requestSlice";
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
      dispatch(removeRequest());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨🏻‍💻Devtinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-3 text-xl">
          <p>Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-11 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="connections">Conncections</Link>
              </li>
              <li>
                <Link to="requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
