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
        <div>
            <div className='chat-header'>Chat Header</div>
            <div className='chat-body'>
                {messageList.map((messageContent, index) => (
                    <div key={index}>
                        <h1>{messageContent.message}</h1>
                        <div>{messageContent.author}</div>
                        <div>{messageContent.time}</div>
                    </div>
                ))}
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    value={currentMessage}
                    placeholder='Type your message...'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => { e.key === "Enter" && sendMessage(); }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
