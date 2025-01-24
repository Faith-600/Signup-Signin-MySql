import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../../App'
import SenderChat from './SenderChat';
import axios from 'axios';


function ChatList() {
 const { username,receiverUsername } = useContext(UserContext);
 const [messages, setMessages] = useState([]);


  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

return (
  <div>
    {messages.map((msg, index) =>
      msg.sender === username ? (
        <SenderChat key={index} message={msg.content} />
      ) : (
        <div key={index} className="flex mb-6">
          <img
            src={`https://robohash.org/${receiverUsername}`}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-semibold text-lg">{receiverUsername}</p>
            <div className="p-3 rounded-lg max-w-xs bg-blue-300 text-black">
              {msg.content}
            </div>
          </div>
        </div>
      )
    )}
  </div>
);
}

export default ChatList