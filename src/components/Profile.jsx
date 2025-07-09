import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { ChangePassword } from "./";

function Profile() {
  const [hideChangePassword, setHideChangePassword] = useState(true);
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        {hideChangePassword && (
          <EditProfile
            user={user}
            setHideChangePassword={setHideChangePassword}
          />
        )}
        {!hideChangePassword && (
          <ChangePassword setHideChangePassword={setHideChangePassword} />
        )}
      </div>
    )
  );
}

export default Profile;
