import React, { useState } from 'react';
import CommentForm from './CommentForm';

function Comment({ comment, replies, addReply,avatarUrl}) {
  
  return (
    <div className="comment mb-4 ml-5" >
      <div className="flex mb-2">
        {/* Commenter's details */}
        <img
          src={avatarUrl}
          alt={comment.username}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{comment.username}</p>
          <p>{comment.content}</p>
          </div>
      </div>

     
      
         <div className="ml-10">
          <CommentForm
            submitLabel=""
            handleSubmit={(text) => {
              addReply(text, comment.id); // Add reply via handler
           }}
          />
        </div> 
      

      {/* Replies */}

      {replies && replies.length > 0 && (
        <div className="ml-10">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]} // Pass replies if nested replies are supported
              addReply={addReply} // Pass addReply for recursive replies
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Comment;
