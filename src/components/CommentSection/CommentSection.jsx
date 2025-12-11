import React, { useState } from 'react';
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';
import { MdSort } from 'react-icons/md';
import { useComments, useAddComment } from '../../hooks/useComments';
import { formatRelativeTime, formatCount } from '../../utils/helpers';

const CommentCard = ({ comment, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex gap-3">
      <img
        src={comment.userAvatar}
        alt={comment.username}
        className="w-10 h-10 rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{comment.username}</span>
          <span className="text-xs text-youtube-gray-500">
            {formatRelativeTime(comment.timestamp)}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{comment.text}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-sm text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white"
          >
            <HiOutlineThumbUp className={`w-4 h-4 ${isLiked ? 'fill-current text-youtube-gray-900 dark:text-white' : ''}`} />
            <span>{formatCount(likes)}</span>
          </button>
          <button className="text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white">
            <HiOutlineThumbDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => onReply(comment.username)}
            className="text-sm font-medium text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white"
          >
            Reply
          </button>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showReplies ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>

            {showReplies && (
              <div className="mt-3 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <img
                      src={reply.userAvatar}
                      alt={reply.username}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{reply.username}</span>
                        <span className="text-xs text-youtube-gray-500">
                          {formatRelativeTime(reply.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{reply.text}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <button className="flex items-center gap-1 text-sm text-youtube-gray-600 dark:text-youtube-gray-400">
                          <HiOutlineThumbUp className="w-4 h-4" />
                          <span>{formatCount(reply.likes)}</span>
                        </button>
                        <button className="text-youtube-gray-600 dark:text-youtube-gray-400">
                          <HiOutlineThumbDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection = ({ videoId }) => {
  const [newComment, setNewComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [sortBy, setSortBy] = useState('top');
  const [replyTo, setReplyTo] = useState(''); // eslint-disable-line no-unused-vars

  const { data: comments = [], isLoading } = useComments(videoId);
  const addCommentMutation = useAddComment();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addCommentMutation.mutate({
      videoId,
      comment: {
        text: newComment,
        username: 'CurrentUser',
        userAvatar: 'https://picsum.photos/seed/currentuser/50/50',
      },
    });
    setNewComment('');
    setIsFocused(false);
    setReplyTo('');
  };

  const handleReply = (username) => {
    setReplyTo(username);
    setNewComment(`@${username} `);
    setIsFocused(true);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'top') {
      return b.likes - a.likes;
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-lg font-medium">
          {comments.length} Comments
        </h3>
        <button
          className="flex items-center gap-2 text-sm font-medium text-youtube-gray-700 dark:text-youtube-gray-300 hover:text-youtube-gray-900 dark:hover:text-white"
          onClick={() => setSortBy(sortBy === 'top' ? 'newest' : 'top')}
        >
          <MdSort className="w-5 h-5" />
          Sort by {sortBy === 'top' ? 'Top' : 'Newest'}
        </button>
      </div>

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <img
          src="https://picsum.photos/seed/currentuser/50/50"
          alt="Your avatar"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          {isFocused && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsFocused(false);
                  setNewComment('');
                  setReplyTo('');
                }}
                className="px-4 py-2 text-sm font-medium text-youtube-gray-700 dark:text-youtube-gray-300 hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-800 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full skeleton" />
              <div className="flex-1">
                <div className="h-4 skeleton rounded w-32 mb-2" />
                <div className="h-3 skeleton rounded w-full mb-1" />
                <div className="h-3 skeleton rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onReply={handleReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
