import React,{useContext,useEffect,useState} from "react";
import { UserContext } from "../../App";
import axios from "axios";
import SenderChat from "./SenderChat";
import { io } from 'socket.io-client'

const ChatWeb = () => {
    const [users, setUsers] = useState([]);
      const [receiver, setReceiver] = useState(null);
      const { username } = useContext(UserContext);
      const [message, setMessage] = useState("");
      const [lastMessages, setLastMessages] = useState({});


       const socket = io('http://localhost:5173');

      useEffect(() => {
        axios
          .get("http://localhost:3001/users")
          .then((response) => {
         setUsers(response.data)
      })
          .catch((error) => console.error("Error fetching users:", error));
     
          socket.on("newMessage", (newMessage) => {
            if (newMessage.sender === username || newMessage.receiver === username) {
              const sender = newMessage.sender === username ? newMessage.receiver : newMessage.sender;
      
              // Update last messages
              setLastMessages((prevMessages) => ({
                ...prevMessages,
                [sender]: { content: newMessage.content, timestamp: new Date() },
              }));
            }
          });
      
          return () => {
            socket.off("newMessage");
          };


      }, []);


      const sendMessage = () => {
        if (message.trim() && receiver) {
          axios
            .post("http://localhost:3001/messages", {
              sender: username,
              receiver,
              content: message,
            })
            .then(() => {
              setMessage("");
            })
            .catch((error) => console.error("Error sending message:", error));
        }
      };


      const sortedUsers = users
      .map((user) => ({
        ...user,
        lastMessage: lastMessages[user.name]?.content || "",
        lastTimestamp: lastMessages[user.name]?.timestamp || null,
      }))
      .sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0));

     
    
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white border-r border-gray-300 mt-6">
       <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
           </header>
           <div>
    <div className="flex mb-6">
        <div>
            {sortedUsers.length === 0 ? (
                <p>No users found</p>
            ) : (
                sortedUsers.map((user) => (
                    <li
                        key={user.id}
                        role="button"
                        onClick={() => setReceiver(user.name)}
                        onKeyDown={(e) => e.key === 'Enter' && setReceiver(user.name)}
                        className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                        tabIndex="0"
                    >
                        <img
                            src={`https://robohash.org/${user.name}`}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <p className="font-semibold text-lg">
                            {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                        </p>
                         <p className="text-sm text-gray-500">{user.lastMessage}</p>
                    </li>
                ))
            )}
        </div>
    </div>
</div>
</div>

     
      <div className="flex-1">
       
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{receiver || "Select a user to chat"}</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
        <SenderChat  receiver={receiver} />
         </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4  bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={sendMessage}
            disabled={username === "Guest"}>
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatWeb;



