import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { ChangePassword } from "./index";

function Profile() {
  const [mode, setMode] = useState("view"); // 'view', 'edit', 'changePassword'
  const user = useSelector((store) => store.user);

  if (user === null) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
    socialLinks = {},
  } = user;

  if (mode === "edit") {
    return <EditProfile user={user} setMode={setMode} />;
  }

  if (mode === "changePassword") {
    return <ChangePassword setMode={setMode} />;
  }

  return (
    user && (
      <div className="w-full max-w-4xl mx-auto p-6 bg-base-300 shadow-xl rounded-lg border border-gray-700">
        <div className="flex gap-2 justify-end items-center">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer text-sm font-semibold"
            onClick={() => setMode("edit")}
          >
            Edit Profile
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer text-sm font-semibold"
            onClick={() => setMode("changePassword")}
          >
            Change Password
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              src={photoUrl}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/334155/e2e8f0?text=Error";
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{`${firstName} ${lastName}`}</h1>
            {/* <p className="text-gray-400 mt-1">
                {`${profileSummary} (${experienceLevel})`}
              </p> */}
            <div className="text-sm text-gray-500 mt-2">
              <span>{age && `${age} years old`}</span> &bull;{" "}
              <span>{gender}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-3">
            About
          </h3>
          <div>
            <p className="text-gray-400 leading-relaxed">{about}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 font-medium text-gray-300 rounded-full text-sm select-none"
              >
                {skill.trim().toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* --- Education & Experience Section --- */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-3">Education</h3>
              <p className="text-gray-400">{education}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-3">Work Experience</h3>
              <p className="text-gray-400">{workExperience}</p>
            </div>
          </div> */}

        <div className="mt-8">
          <h3 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
            Social Links
          </h3>
          <div className="flex items-center gap-5">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-ghost btn-info"
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.731.084-.716.084-.716 1.192.085 1.816 1.22 1.816 1.22 1.06 1.816 2.792 1.299 3.47.993.108-.775.418-1.299.762-1.599-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.201-6.086 8.201-11.385 0-6.627-5.373-12-12-12z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-6.492 2.902-6.492 6.492 0 .512.057 1.01.173 1.496-5.392-.27-10.187-2.868-13.387-6.815-.56.967-.883 2.09-.883 3.29 0 2.252 1.149 4.241 2.892 5.416-.848-.025-1.649-.263-2.35-.647-.005.022-.005.045-.005.068 0 3.181 2.26 5.834 5.26 6.437-.55.148-1.13.23-1.729.23-.424 0-.834-.041-1.234-.117.834 2.606 3.25 4.504 6.107 4.559-2.245 1.76-5.07 2.81-8.159 2.81-1.056 0-2.097-.061-3.105-.18 2.906 1.853 6.307 2.929 9.962 2.929 11.92 0 18.43-9.912 18.43-18.43 0-.281-.006-.562-.019-.842.815-.588 1.523-1.31 2.084-2.135z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
