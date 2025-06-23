import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

function Profile() {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
}

export default Profile;
