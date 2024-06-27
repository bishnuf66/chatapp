import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Chat';

export default function Home() {
    const socket = io.connect("http://localhost:3001");
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div>
            {!showChat ? (
                <div>
                    <h1>Join Chat</h1>
                    <input
                        type="text"
                        placeholder="John..."
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Room ID"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}
