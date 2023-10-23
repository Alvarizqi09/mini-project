import { useState} from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const Comments = ({ comments, onAddComment, onEditComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment) {
      const username = JSON.parse(localStorage.getItem('userData')).username;
      const comment = { username, text: newComment, timestamp: new Date().toISOString() };

      onAddComment(comment);

      setNewComment('');

      localStorage.setItem('comments', JSON.stringify([...comments, comment]));

      Swal.fire('Comment Added!', '', 'success');
    } else {
      Swal.fire('Please enter a comment.', '', 'error');
    }
  };

  const handleEditComment = (index, editedComment) => {
    Swal.fire({
      title: 'Edit Comment',
      input: 'text',
      inputPlaceholder: 'Edit your comment',
      inputValue: editedComment.text,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onEditComment(index, { ...editedComment, text: result.value });

        localStorage.setItem('comments', JSON.stringify(comments));

        Swal.fire('Comment Updated!', '', 'success');
      }
    });
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
        onDeleteComment(index);

        localStorage.setItem('comments', JSON.stringify(comments));

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
              onClick={() => handleEditComment(index, comment)}
              className="text-blue-500 underline mr-2"
            >
              Edit
            </button>
            <button onClick={() => handleDeleteComment(index)} className="text-red-500 underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default Comments;
