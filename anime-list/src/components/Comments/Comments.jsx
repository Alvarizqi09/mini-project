import { useState } from 'react';
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

  const formatIndonesianDateTime = (isoString) => {
    const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(isoString));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white shadow">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">{comment.username}</span>
              <span className="text-gray-500">{formatIndonesianDateTime(comment.timestamp)}</span>
            </div>
            <p className="mt-2 text-gray-800">{comment.text}</p>
            <div className="mt-2 space-x-4">
              <button
                onClick={() => handleEditComment(index, comment)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteComment(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <textarea
          className="w-full h-24 p-4 border rounded-lg"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="mt-4">
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Comment
          </button>
        </div>
      </div>
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
