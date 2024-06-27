import React, { useEffect, useState } from 'react';

function Chat({ socket, username, room }) {
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage.trim() !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage.trim(),
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setCurrentMessage(""); // Clear input field
        }
    };

    useEffect(() => {
        socket.emit("join_room", room);
        const receiveMessage = (data) => {
            console.log("Received message:", data);
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", receiveMessage);
        return () => {
            socket.off("receive_message", receiveMessage);
        };
    }, [socket, room]);
    
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-none p-4 bg-blue-500 text-white text-center text-2xl font-bold">
                Chat Room: {room}
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                {messageList.map((messageContent, index) => (
                    <div key={index} className="mb-4 p-4 bg-white shadow rounded">
                        <h1 className="font-bold">{messageContent.author}</h1>
                        <p>{messageContent.message}</p>
                        <span className="text-gray-500 text-sm">{messageContent.time}</span>
                    </div>
                ))}
            </div>
            <div className="flex-none p-4 bg-white flex items-center">
                <label className="flex items-center text-gray-700 mr-4">
                    <i className="material-icons mr-2">message</i>
                    Message
                </label>
                <input
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
                    type='text'
                    value={currentMessage}
                    placeholder='Type your message...'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => { e.key === "Enter" && sendMessage(); }}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    onClick={sendMessage}
                >
                    <i className="material-icons mr-2">send</i>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
