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
      className="comment-item relative flex gap-4 p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
      style={{ '--depth': comment.depth } as React.CSSProperties}
    >
      {/* Avatar */}
      <div className="comment-avatar flex-shrink-0">
        <img
          src={comment.author.avatar}
          alt={`${comment.author.name} avatar`}
          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800 shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Comment Content */}
      <div className="comment-content flex-1 min-w-0">
        {/* Author and Timestamp Header */}
        <header className="comment-header flex items-center gap-2 mb-3">
          <h3 className="comment-author font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {comment.author.name}
          </h3>
          {comment.author.username && (
            <span className="comment-username text-sm text-gray-500 dark:text-gray-400 font-medium">
              @{comment.author.username}
            </span>
          )}
          <span className="comment-separator text-gray-300 dark:text-gray-600">•</span>
          <time 
            className="comment-timestamp text-sm text-gray-500 dark:text-gray-400"
            dateTime={comment.timestamp.toISOString()}
            title={comment.timestamp.toLocaleString()}
            suppressHydrationWarning={true}
          >
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </time>
        </header>

        {/* Comment Text */}
        <div 
          className={`comment-text mb-4 ${
            comment.isEmojiOnly 
              ? 'text-3xl leading-relaxed py-1' 
              : 'text-gray-800 dark:text-gray-200 leading-relaxed text-[15px]'
          }`}
        >
          <p className="break-words">{comment.content}</p>
        </div>

        {/* Action Buttons */}
        <footer className="comment-actions flex items-center gap-1">
          <button
            onClick={handleLike}
            aria-label={comment.isLiked ? 'Unlike comment' : 'Like comment'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              comment.isLiked
                ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                : 'text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400'
            }`}
          >
            <span className="text-base leading-none" aria-hidden="true">
              {comment.isLiked ? '❤️' : '🤍'}
            </span>
            {comment.likes > 0 && (
              <span className="tabular-nums">{comment.likes}</span>
            )}
          </button>

          <button
            onClick={handleReply}
            aria-label="Reply to comment"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all duration-200"
          >
            <span className="text-base leading-none" aria-hidden="true">💬</span>
            <span>Reply</span>
          </button>
        </footer>
      </div>
    </article>
  );
}