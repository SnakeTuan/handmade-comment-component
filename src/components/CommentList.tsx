import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';
import { useState } from 'react';

interface CommentListProps {
  comments: CommentType[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  maxDepth?: number;
}

const INITIAL_REPLIES_DISPLAY_COUNT = 2;

export default function CommentList({
  comments,
  onLike,
  onReply,
  maxDepth = 4,
}: CommentListProps) {
  const [visibleRepliesMap, setVisibleRepliesMap] = useState<Map<string, number>>(() => new Map());

  const handleShowMoreReplies = (commentId: string) => {
    setVisibleRepliesMap(prevMap => {
      const newMap = new Map(prevMap);
      // Set to a very large number to show all replies
      newMap.set(commentId, Infinity);
      return newMap;
    });
  };

  if (!comments.length) return null;

  return (
    <ul className="comment-list space-y-0">
      {comments.map((comment, index) => {
        const isLastComment = index === comments.length - 1;
        const isReply = (comment.depth || 0) > 0;
        const liClasses = [
          "comment-item",
          isReply ? "is-reply" : "",
          !isLastComment ? "is-not-last-child" : ""
        ].filter(Boolean).join(" ");

        const totalReplies = comment.totalReplies !== undefined ? comment.totalReplies : comment.replies.length;
        const currentVisibleReplies = visibleRepliesMap.get(comment.id) || INITIAL_REPLIES_DISPLAY_COUNT;
        const repliesToDisplay = comment.replies.slice(0, currentVisibleReplies);
        const showMoreRepliesCount = totalReplies - repliesToDisplay.length;

        return (
          <li
            key={comment.id}
            className={liClasses}
            style={{ '--depth': comment.depth || 0 } as React.CSSProperties}
          >
            {/* Render the comment */}
            <Comment
              comment={comment}
              onLike={onLike}
              onReply={onReply}
              isReply={isReply}
              showMoreRepliesCount={showMoreRepliesCount > 0 ? showMoreRepliesCount : undefined}
              onShowMoreReplies={handleShowMoreReplies}
            />

            {/* Render nested replies if they exist and we haven't exceeded max depth */}
            {repliesToDisplay.length > 0 && (comment.depth || 0) < maxDepth && (
              <CommentList
                comments={repliesToDisplay}
                onLike={onLike}
                onReply={onReply}
                maxDepth={maxDepth}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}