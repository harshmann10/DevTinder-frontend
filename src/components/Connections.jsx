// import axios from "axios";
import { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import api from "../utils/apiAxios";

function Connections() {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnection = async () => {
        try {
            const res = await api.get("/user/connections");
            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.error("Failed to fetch connections:", err);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    if (!connections) return;
    if (connections.length === 0)
        return (
            <h1 className="mt-10 text-center text-2xl font-semibold text-gray-500">
                No connections found
            </h1>
        );

    return (
        <div className="text-center mt-5">
            <h1 className="font-bold text-3xl mb-7">Connections</h1>
            {connections.map((connection) => {
                const {
                    _id,
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                    skills,
                } = connection;
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Connections;
