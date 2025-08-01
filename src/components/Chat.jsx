import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/constants";
import { useSelector } from "react-redux";

function Chat() {
    const { targetUserId } = useParams();
    const location = useLocation();
    const [messages, setMessages] = useState([
        { text: "You were the Chosen One!", from: "other" },
        { text: "I hate you!", from: "me" },
    ]);
    const [newMessages, setNewMessages] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const targetUser = location.state?.targetUser;

    const socket = createSocketConnection();

    useEffect(() => {
        if (!userId) { return }
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

        socket.on("messageReceived", (message) => {
            setMessages((prevMessages) => [...prevMessages, { from: message.firstName === user.firstName ? "me" : "other", text: message.newMessages }]);
        });

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        socket.emit("sendMessage", { firstName: user.firstName, userId, targetUserId, newMessages });
        setNewMessages("");
    }

    return (
        <div className="w-full max-w-3xl mx-auto border border-base-300 bg-base-200 shadow-xl rounded-lg my-5 h-[80vh] flex flex-col">
            <div className="p-4 border-b border-base-300 flex items-center gap-4 bg-base-300 rounded-t-lg">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img
                            src={targetUser?.photoUrl}
                            alt="Chat partner"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-xl">
                        {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Loading..."}
                    </h2>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat ${msg.from === 'me' ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt={`${msg.from === 'me' ? 'Your' : targetUser?.firstName || 'Chat partner'}'s avatar`}
                                    src={msg.from === 'me' ? user?.photoUrl : targetUser?.photoUrl}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            {msg.from === 'me' ? 'You' : targetUser?.firstName || 'Chat partner'}
                            <time className="text-xs opacity-50 ml-2">12:44</time>
                        </div>
                        <div className={`chat-bubble ${msg.from === 'me' ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}>{msg.text}</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-base-300 bg-base-300 rounded-b-lg">
                <div className="flex items-center gap-2">
                    <input
                        className="input input-bordered w-full"
                        type="text"
                        placeholder="Type a message..."
                        value={newMessages}
                        onChange={(e) => setNewMessages(e.target.value)}
                    />
                    <button className="btn btn-primary gap-2" onClick={sendMessage}>
                        Send
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
