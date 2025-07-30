export interface User {
  id: string;
  name: string;
  avatar: string;
  username?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  depth?: number; // For CSS depth-based styling
  isEmojiOnly?: boolean; // Special state for emoji-only comments
  parentId?: string; // Reference to parent comment
  totalReplies?: number; // Total number of replies, including hidden ones
}

export interface CommentProps {
  comment: Comment;
  onReply?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  showConnectingLines?: boolean;
  maxDepth?: number;
}

export interface CommentListProps {
  comments: Comment[];
  onReply?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  showConnectingLines?: boolean;
  maxDepth?: number;
  currentDepth?: number;
}