// "use client"
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button'; // Importing Button from ShadCN UI

// const CommentSection = () => {
//   // State for storing comments and the current input value
//   const [comments, setComments] = useState<string[]>([]);
//   const [newComment, setNewComment] = useState<string>('');

//   // Handler to update the new comment input field
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewComment(e.target.value);
//   };

//   // Handler to add a new comment to the list
//   const handleAddComment = () => {
//     if (newComment.trim() === '') return; // Don't add empty comments
//     setComments((prevComments) => [...prevComments, newComment]);
//     setNewComment(''); // Clear the input field after adding the comment
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Comments</h2>

//       {/* Input and button for adding a new comment */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={newComment}
//           onChange={handleInputChange}
//           placeholder="Add a comment..."
//           className="w-full p-2 border border-gray-300 rounded-lg"
//         />
//         <Button
//           onClick={handleAddComment}
//           variant="default" // Set variant to 'default' or any other supported option
//           className="mt-2"
//         >
//           Add Comment
//         </Button>
//       </div>

//       {/* Displaying the list of comments */}
//       <div className="comments-list">
//         {comments.length > 0 ? (
//           <ul className="list-disc pl-5">
//             {comments.map((comment, index) => (
//               <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
//                 {comment}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;


"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Importing Button from ShadCN UI

const CommentSection = () => {
  // State for storing comments and the current input value
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Update localStorage whenever comments state changes
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  // Handler to update the new comment input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  // Handler to add a new comment to the list
  const handleAddComment = () => {
    if (newComment.trim() === '') return; // Don't add empty comments
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment(''); // Clear the input field after adding the comment
  };

  return (
    <div className="container mx-auto p-6">
     

      {/* Input and button for adding a new comment */}
      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={handleInputChange}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <Button
          onClick={handleAddComment}
          variant="default" // Set variant to 'default' or any other supported option
          className="mt-2"
        >
          Add Comment
        </Button>
      </div>

      {/* Displaying the list of comments */}
      <div className="comments-list">
        {comments.length > 0 ? (
          <ul className="list-disc pl-5">
            {comments.map((comment, index) => (
              <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
