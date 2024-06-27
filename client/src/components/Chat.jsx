 import React, { useEffect, useState } from 'react'
 
 function Chat({socket,username,room}) {

    const[currentMessage,setCurrentMessage]=useState("")
    const sendMessage = async()=>{
        if(currentMessage !== ""){
        const messagedata={
            room:room,
            author:username,
            message:currentMessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",messagedata)
        }

    }
    useEffect(()=>{
        socket.in("receive_message",(data)=>{

        },[socket]);
            
    })
   return (
    <div>
          <div className='chat h'>chat header</div>

     <div className='chat b'>Chat body</div>


     <div className='chat f'>chat footer</div>

     <input type='text' placeholder='hey'onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
   <button onClick={sendMessage}>send</button>
     </div>
   )
 }
 
 export default Chat