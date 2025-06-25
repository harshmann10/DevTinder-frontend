import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

function Connections() {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res.data.data));
            console.log(res.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <h1>No connections found</h1>;

    return (
        <div className="text-center mt-5">
            <h1 className="font-bold text-3xl">Connections</h1>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about } =
                    connection;
                return (
                    <div className="container bg-base-300 m-4 p-4 rounded-lg flex w-3/4 mx-auto">
                        <img
                            className="w-32 h-32 object-cover rounded-full"
                            src={photoUrl}
                            alt="photo"
                        />
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            <p>{age + ", " + gender}</p>
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Connections;
