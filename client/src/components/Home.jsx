import io from 'socket.io-client'
import {useState} from "react"
import Chat from './Chat'


export default function Home(){
    const socket=io.connect("http://localhost:3001")
    const[username, setUsername]= useState("");
    const [room,setRoom]=useState("");

    const joinRoom=()=>{
        if (username !=="" && room !==""){
            socket.emit("join_room",room)

        }
    };
    return(
        <div>
            <h1>join chat</h1>
            <input type='text' placeholder='john..' onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="text"placeholder='room id' onChange={(e)=>{setRoom(e.target.value)}}/>
            <button onClick={joinRoom}>join a room</button>
            <div>
        </div>
        <Chat socket={socket}
                username={username}
                room={room}/>
        </div>
    )
} 