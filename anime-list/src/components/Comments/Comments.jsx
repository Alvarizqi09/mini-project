import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleAddComment = () => {
    if (newComment) {
      const username = JSON.parse(localStorage.getItem('userData')).username;
      const newComments = [
        ...comments,
        { username, text: newComment, timestamp: new Date().toISOString() },
      ];
      setComments(newComments);
      setNewComment('');

      localStorage.setItem('comments', JSON.stringify(newComments));

      Swal.fire('Comment Added!', '', 'success'); // Show SweetAlert success message
    } else {
      Swal.fire('Please enter a comment.', '', 'error'); // Show SweetAlert error message
    }
  };

  const handleEditComment = (index, editedComment) => {
    const updatedComments = [...comments];
    updatedComments[index] = editedComment;
    setComments(updatedComments);

    localStorage.setItem('comments', JSON.stringify(updatedComments));

    Swal.fire('Comment Updated!', '', 'success'); // Show SweetAlert success message
  };

  const handleDeleteComment = (index) => {
    Swal.fire({
      title: 'Delete Comment?',
      text: 'Are you sure you want to delete this comment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);

        localStorage.setItem('comments', JSON.stringify(updatedComments));

        Swal.fire('Comment Deleted!', '', 'success');
      }
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-medium mb-2">Comments</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded w-full p-2"
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white ml-2 p-2 rounded-md">
          Add Comment
        </button>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="mb-4 border p-3 rounded-lg">
          <p className="text-lg font-semibold">{comment.username}</p>
          <p>{comment.text}</p>
          <div>
            <button
              onClick={() =>
                handleEditComment(index, {
                  ...comment,
                  text: prompt('Edit your comment:', comment.text),
                })
              }
              className="text-blue-500 underline mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteComment(index)}
              className="text-red-500 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
