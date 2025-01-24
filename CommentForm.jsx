import React, { useState,useContext } from "react";
import { UserContext } from "../../App";

function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { username } = useContext(UserContext);

  // Toggle reply form visibility
  const toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== "") {
      handleSubmit(text); // Pass the comment text to the parent handler
      setText(""); // Clear the textarea
      setIsReplying(false); // Hide the reply form after submission
    }
  };

  return (
    <div>
      {isReplying && ( // Only show the form when replying
        <form onSubmit={onSubmit} className="w-full p-2 border rounded">
          <textarea
            className="w-full p-2 border rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
          />

          <div className="mt-4 flex justify-between">
            <button type="submit" className="text-sm text-blue-500 hover:underline mt-2"
            disabled={username.toLowerCase() === "guest"} 
            >
              Submit
            </button>
            <button
              type="button"
              className="text-sm text-red-500 hover:underline mt-2"
              onClick={toggleReplyForm}
            >
              Cancel
            </button>
          </div>
          
        </form>
      )}
      {!isReplying && (
        <button
          type="button"
          className={`text-sm ${
            username.toLowerCase() === "guest"
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-500 hover:underline"
          } mb-3 ml-3`}
          onClick={toggleReplyForm}
          disabled={username.toLowerCase() === "guest"}
        >
          {/* {username.toLowerCase() === "guest" ? "Login to Reply" : submitLabel} */}
          {submitLabel}
        </button>
      )}
    </div>
  );
}

export default CommentForm;
