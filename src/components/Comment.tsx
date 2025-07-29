import { Comment as CommentType } from '../types/comment';
import { formatDistanceToNow } from 'date-fns';

interface CommentProps {
  comment: CommentType;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
}

export default function Comment({ comment, onLike, onReply }: CommentProps) {
  const handleLike = () => {
    onLike?.(comment.id);
  };

  const handleReply = () => {
    onReply?.(comment.id);
  };

  return (
    <article 
      className="comment flex gap-3 p-4"
      style={{ '--depth': comment.depth } as React.CSSProperties}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={comment.author.avatar}
          alt={`${comment.author.name} avatar`}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        {/* Author and Timestamp */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {comment.author.name}
          </h3>
          {comment.author.username && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{comment.author.username}
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>

        {/* Comment Text */}
        <div 
          className={`mb-3 ${
            comment.isEmojiOnly 
              ? 'text-2xl leading-relaxed' 
              : 'text-gray-800 dark:text-gray-200 leading-relaxed'
          }`}
        >
          {comment.content}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              comment.isLiked
                ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-500 hover:text-red-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-base">{comment.isLiked ? '❤️' : '🤍'}</span>
            {comment.likes > 0 && <span>{comment.likes}</span>}
          </button>

          <button
            onClick={handleReply}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-base">💬</span>
            <span>Reply</span>
          </button>
        </div>
      </div>
    </article>
  );
}