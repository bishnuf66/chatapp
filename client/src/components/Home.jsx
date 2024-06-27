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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {!showChat ? (
                <div className="p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Create Or Join Chat Room</h1>
                    <div className="mb-4">
                        <label className="flex items-center mb-2 text-gray-700">
                            <i className="material-icons mr-2">account_circle</i>
                            Username
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="John..."
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center mb-2 text-gray-700">
                            <i className="material-icons mr-2">meeting_room</i>
                            Room ID
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Room ID"
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={joinRoom}
                    >
                        Join Room
                    </button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}
