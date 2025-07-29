import { Comment as CommentType } from '../types/comment';
import { formatDistanceToNow } from 'date-fns';

interface CommentProps {
  comment: CommentType;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  isReply?: boolean;
}

export default function Comment({ comment, onLike, onReply, isReply }: CommentProps) {
  const handleLike = () => {
    onLike?.(comment.id);
  };

  const handleReply = () => {
    onReply?.(comment.id);
  };

  const articleClasses = [
    "comment",
    "relative",
    "flex",
    "gap-4",
    "p-6",
    "hover:bg-gray-50/50",
    "transition-colors",
    isReply ? "is-reply" : ""
  ].filter(Boolean).join(" ");

  return (
    <article 
      className={articleClasses}
      style={{ '--depth': comment.depth || 0 } as React.CSSProperties}
    >
      {/* Avatar */}
      <div className="comment-avatar flex-shrink-0">
        <img
          src={comment.author.avatar}
          alt={`${comment.author.name} avatar`}
          className="w-10 h-10 rounded-full bg-gray-200 ring-2 ring-white shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Comment Content */}
      <div className="comment-content flex-1 min-w-0">
        <div className="bg-gray-100 rounded-xl p-4">
          {/* Author and Timestamp Header */}
          <header className="comment-header flex items-center gap-2 mb-3">
            <h3 className="comment-author font-semibold text-gray-900 text-sm">
              {comment.author.name}
            </h3>
            {comment.author.username && (
              <span className="comment-username text-sm text-gray-500 font-medium">
                @{comment.author.username}
              </span>
            )}
            <span className="comment-separator text-gray-300">•</span>
            <time 
              className="comment-timestamp text-sm text-gray-500"
              dateTime={comment.timestamp.toISOString()}
              title={comment.timestamp.toLocaleString()}
              suppressHydrationWarning={true}
            >
              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
            </time>
          </header>

          {/* Comment Text */}
          <div 
            className={`comment-text ${
              comment.isEmojiOnly 
                ? 'text-3xl leading-relaxed py-1' 
                : 'text-gray-800 leading-relaxed text-[15px]'
            }`}
          >
            <p className="break-words">{comment.content}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <footer className="comment-actions flex items-center gap-1 mt-2">
          <button
            onClick={handleLike}
            aria-label={comment.isLiked ? 'Unlike comment' : 'Like comment'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              comment.isLiked
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <span className="text-base leading-none" aria-hidden="true">💬</span>
            <span>Reply</span>
          </button>
        </footer>
      </div>
    </article>
  );
}