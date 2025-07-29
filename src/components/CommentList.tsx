import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';

interface CommentListProps {
  comments: CommentType[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  maxDepth?: number;
}

export default function CommentList({ 
  comments, 
  onLike, 
  onReply, 
  maxDepth = 4 
}: CommentListProps) {
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
            />
            
            {/* Render nested replies if they exist and we haven't exceeded max depth */}
            {comment.replies.length > 0 && (comment.depth || 0) < maxDepth && (
              <CommentList
                comments={comment.replies}
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