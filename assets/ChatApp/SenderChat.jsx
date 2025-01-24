import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { io } from 'socket.io-client'


function SenderChat({  receiver }) {
  const [messages, setMessages] = useState([]);
  const { username } = useContext(UserContext);

  const socket = io('http://localhost:5173');
 

  const fetchMessages = () => {
    if (receiver) {
      axios
        .get(`http://localhost:3001/messages/${username}/${receiver}`)
        .then((response) => {
       setMessages(response.data);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  };

  useEffect(() => {
    fetchMessages(); 

    socket.on('newMessage', (newMessage) => {
      if ((newMessage.sender === username && newMessage.receiver === receiver) ||
          (newMessage.sender === receiver && newMessage.receiver === username)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    const interval = setInterval(fetchMessages, 3000); 

    return () =>{
      clearInterval(interval); 
      socket.off('newMessage')
    } 
  }, [username, receiver]);

  if (!receiver) {
    return <p className="text-gray-500 text-center">Select a user to start chatting.</p>;
  }

  

  return (
    <div className="p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start mb-4 ${
            message.sender === username ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender !== username && (
           <img
           src={`https://robohash.org/${message.sender}`}
       alt={`${message.sender}'s Avatar`}
           className="w-12 h-12 rounded-full object-cover mr-4"
         />
         
          )}
          <div
            className={`inline-block px-4 py-2 rounded-lg ${
              message.sender === username
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <p className="font-semibold">
              {message.sender === username ? "You" : message.sender}
            </p>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SenderChat;
