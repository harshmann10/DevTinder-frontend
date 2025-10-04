import { useState, useEffect, useRef, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/constants";
import { useSelector } from "react-redux";
import api from "../utils/apiAxios";

function Chat() {
    const { targetUserId } = useParams();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const targetUser = location.state?.targetUser;
    // 1. Initialize the socket only once using the useState initializer function.
    // This ensures the socket instance is created only on the initial render.
    const [socket] = useState(() => createSocketConnection());
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchChatMessage = async () => {
        if (!userId) return;
        try {
            const { data } = await api.get("chat/" + targetUserId);
            if (data.message) {
                const formattedMessages = data.message.map((msg) => ({
                    text: msg.text,
                    from: msg.senderId._id === userId ? "me" : "other",
                    createdAt: msg.createdAt,
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }
    };

    useEffect(() => {
        fetchChatMessage();
    }, [userId, targetUserId]);

    // 2. This effect now handles joining rooms and listening for messages.
    // It will only run if user, userId, and socket are available.
    useEffect(() => {
        // Ensure user object and its firstName property exist before emitting
        if (!user || !user.firstName || !userId || !socket) {
            return;
        }

        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

        const handleMessageReceived = ({ firstName, text, createdAt }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                // Safely access user.firstName here as well
                { from: firstName === user?.firstName ? "me" : "other", text, createdAt },
            ]);
        };

        socket.on("messageReceived", handleMessageReceived);

        // Cleanup: remove the message listener when the user or chat changes.
        // This prevents multiple listeners from accumulating.
        return () => {
            socket.off("messageReceived", handleMessageReceived);
        };
    }, [userId, targetUserId, user, socket]); // Depend on the entire user object and socket

    // 3. Add a new effect to handle disconnecting when the component unmounts.
    // This ensures the socket connection is closed only when the Chat component is removed.
    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]); // Depend on socket to ensure cleanup runs when socket is available

    const sendMessage = () => {
        // Also ensure user and socket are available before sending
        if (newMessages.trim() === "" || !socket || !user || !user.firstName) return;
        socket.emit("sendMessage", { firstName: user.firstName, userId, targetUserId, text: newMessages });
        setNewMessages("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatDateBanner = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    let lastDisplayedDate = null;

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
            <div className="flex-1 overflow-y-auto p-5 space-y-2">
                {messages.map((msg, index) => {
                    const messageDate = new Date(msg.createdAt).toLocaleDateString();
                    const showDateBanner = messageDate !== lastDisplayedDate;
                    if (showDateBanner) {
                        lastDisplayedDate = messageDate;
                    }
                    return (
                        <Fragment key={index}>
                            {showDateBanner && (
                                <div className="text-center my-4">
                                    <span className="badge badge-neutral px-3 py-2 text-xs font-semibold">
                                        {formatDateBanner(msg.createdAt)}
                                    </span>
                                </div>
                            )}
                            <div className={`chat ${msg.from === 'me' ? 'chat-end' : 'chat-start'}`}>
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
                                    <time className="text-xs opacity-50 ml-2">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </time>
                                </div>
                                <div className={`chat-bubble ${msg.from === 'me' ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}>{msg.text}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </Fragment>
                    );
                })}
                <div ref={chatEndRef} />
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
                        onKeyDown={handleKeyPress}
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
