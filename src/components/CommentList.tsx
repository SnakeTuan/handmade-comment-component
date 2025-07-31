import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';
import { useState } from 'react';

interface CommentListProps {
  comments: CommentType[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  maxDepth?: number;
  isNested?: boolean;
}

const INITIAL_REPLIES_DISPLAY_COUNT = 2;

export default function CommentList({
  comments,
  onLike,
  onReply,
  maxDepth = 4,
  isNested = false,
}: CommentListProps) {
  const [visibleRepliesMap, setVisibleRepliesMap] = useState<Map<string, number>>(() => new Map());

  const handleShowMoreReplies = (commentId: string) => {
    setVisibleRepliesMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(commentId, Infinity);
      return newMap;
    });
  };

  if (!comments.length) return null;

  return (
    <ul className={`comment-list ${!isNested ? 'space-y-0' : ''}`}>
      {comments.map((comment, index) => {
        const totalReplies = comment.totalReplies !== undefined ? comment.totalReplies : comment.replies.length;
        const currentVisibleReplies = visibleRepliesMap.get(comment.id) || INITIAL_REPLIES_DISPLAY_COUNT;
        const repliesToDisplay = comment.replies.slice(0, currentVisibleReplies);
        const showMoreRepliesCount = totalReplies - repliesToDisplay.length;

        const hasChildren = comment.replies.length > 0;
        const isReply = (comment.depth || 0) > 0;
        
        const liClasses = [
          "comment-item",
          hasChildren ? "has-children" : ""
        ].filter(Boolean).join(" ");

        const showMoreClasses = [
          "comment",
          "is-reply",
          "comment-show-more",
          "relative",
          "flex",
          "gap-4",
          "p-6",
          "hover:bg-gray-50/50",
          "transition-colors"
        ].join(" ");

        return (
          <li
            key={comment.id}
            className={liClasses}
            style={{ '--depth': comment.depth || 0 } as React.CSSProperties}
          >
            <Comment
              comment={comment}
              onLike={onLike}
              onReply={onReply}
              isReply={isReply}
            />

            {/* Render replies and "show more" button in their own list */}
            {(repliesToDisplay.length > 0 || showMoreRepliesCount > 0) && (comment.depth || 0) < maxDepth && (
              <ul className="comment-list is-nested">
                {repliesToDisplay.map((reply, replyIndex) => {
                  const isLastReply = replyIndex === repliesToDisplay.length - 1 && showMoreRepliesCount === 0;
                  const replyLiClasses = [
                    "comment-item",
                    !isLastReply ? "is-not-last-child" : ""
                  ].filter(Boolean).join(" ");

                  return (
                    <li key={reply.id} className={replyLiClasses} style={{ '--depth': reply.depth || 0 } as React.CSSProperties}>
                      <Comment
                        comment={reply}
                        onLike={onLike}
                        onReply={onReply}
                        isReply
                      />
                    </li>
                  );
                })}

                {showMoreRepliesCount > 0 && (
                  <li className="comment-item" style={{ '--depth': (comment.depth || 0) + 1 } as React.CSSProperties}>
                    <div className={showMoreClasses}>
                      <div className="comment-avatar flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 ring-2 ring-white shadow-sm opacity-0"></div>
                      </div>
                      <button
                        onClick={() => handleShowMoreReplies(comment.id)}
                        className="flex-1 min-w-0 text-left text-blue-600 hover:underline font-medium text-sm"
                      >
                        Show {showMoreRepliesCount} more replies
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}