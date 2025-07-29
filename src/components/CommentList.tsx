import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';

interface CommentListProps {
  comments: CommentType[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  currentDepth?: number;
  maxDepth?: number;
}

export default function CommentList({ 
  comments, 
  onLike, 
  onReply, 
  currentDepth = 0,
  maxDepth = 4 
}: CommentListProps) {
  if (!comments.length) return null;

  return (
    <ul 
      className="comment-list space-y-0"
      style={{ '--current-depth': currentDepth } as React.CSSProperties}
    >
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          {/* Render the comment */}
          <Comment 
            comment={{ ...comment, depth: currentDepth }}
            onLike={onLike}
            onReply={onReply}
          />
          
          {/* Render nested replies if they exist and we haven't exceeded max depth */}
          {comment.replies.length > 0 && currentDepth < maxDepth && (
            <CommentList
              comments={comment.replies}
              onLike={onLike}
              onReply={onReply}
              currentDepth={currentDepth + 1}
              maxDepth={maxDepth}
            />
          )}
        </li>
      ))}
    </ul>
  );
}