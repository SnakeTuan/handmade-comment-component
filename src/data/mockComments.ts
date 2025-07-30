import { Comment, User } from '../types/comment';

// Helper function to detect emoji-only comments (as mentioned in the article)
const isEmojiOnly = (text: string): boolean => {
  const emojiRegex = /^[\p{Emoji}\s]+$/u;
  return emojiRegex.test(text.trim()) && text.trim().length > 0;
};

// Mock users with diverse profiles
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    username: 'marcusj',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    username: 'aishap',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha'
  },
  {
    id: '4',
    name: 'David Kim',
    username: 'davidk',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  },
  {
    id: '5',
    name: 'Emma Rodriguez',
    username: 'emmar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    username: 'alext',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    id: '7',
    name: 'Priya Singh',
    username: 'priyas',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    id: '8',
    name: 'Jordan White',
    username: 'jordanw',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
  },
  {
    id: '9',
    name: 'Olivia Brown',
    username: 'oliviab',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia'
  },
  {
    id: '10',
    name: 'Noah Davis',
    username: 'noahd',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah'
  }
];

// Create comment with calculated properties
const createComment = (
  id: string,
  author: User,
  content: string,
  timestamp: Date,
  likes: number = 0,
  isLiked: boolean = false,
  replies: Comment[] = [],
  parentId?: string,
  totalReplies?: number // New parameter
): Comment => {
  const comment: Comment = {
    id,
    author,
    content,
    timestamp,
    likes,
    isLiked,
    replies,
    parentId,
    isEmojiOnly: isEmojiOnly(content),
    totalReplies: totalReplies !== undefined ? totalReplies : replies.length // Set totalReplies
  };

  // Calculate depth based on nested structure
  const calculateDepth = (comment: Comment, currentDepth = 0): Comment => {
    comment.depth = currentDepth;
    comment.replies = comment.replies.map(reply =>
      calculateDepth(reply, currentDepth + 1)
    );
    return comment;
  };

  return calculateDepth(comment);
};

// Generate timestamps for realistic timeline
const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - (hours * 60 * 60 * 1000));
const daysAgo = (days: number) => new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));

export const mockComments: Comment[] = [
  createComment(
    '1',
    mockUsers[0],
    'This is such a brilliant approach to building comment systems! The use of modern CSS features like container queries and :has() selector really showcases how far web development has come. 🚀',
    daysAgo(2),
    24,
    false,
    [
      createComment(
        '1-1',
        mockUsers[1],
        "Absolutely agree! The semantic HTML structure with nested ul/li elements is so elegant. It's accessibility-first and works great with screen readers.",
        daysAgo(1),
        12,
        true,
        [
          createComment(
            '1-1-1',
            mockUsers[2],
            '💯',
            hoursAgo(20),
            5,
            false,
            [],
            '1-1'
          ),
          createComment(
            '1-1-2',
            mockUsers[0],
            "Thanks! I'm particularly excited about the depth-based styling. The way CSS variables can control avatar sizes and spacing at different nesting levels is just chef's kiss 👨‍🍳💋",
            hoursAgo(18),
            8,
            false,
            [
              createComment(
                '1-1-2-1',
                mockUsers[3],
                "The connecting lines feature using pseudo-elements is genius! It automatically creates those visual threads between parent and child comments. Perfect for showing conversation flow.",
                hoursAgo(15),
                3,
                false,
                [],
                '1-1-2'
              )
            ],
            '1-1'
          )
        ],
        '1'
      ),
      createComment(
        '1-2',
        mockUsers[4],
        'Quick question - does this work well with RTL languages? I noticed the article mentions CSS logical properties.',
        hoursAgo(22),
        6,
        false,
        [
          createComment(
            '1-2-1',
            mockUsers[0],
            'Yes! The dir="auto" attribute and CSS logical properties handle RTL/LTR automatically. The connecting lines and spacing adapt perfectly to different text directions.',
            hoursAgo(21),
            4,
            false,
            [],
            '1-2'
          )
        ],
        '1'
      )
    ]
  ),
  createComment(
    '2',
    mockUsers[5],
    'I love how this handles emoji-only comments with special styling! 😍✨🎉',
    daysAgo(1),
    18,
    true,
    [
      createComment(
        '2-1',
        mockUsers[6],
        "Right? The :has() selector detecting emoji content is such a clever use of modern CSS. No JavaScript needed for that logic!",
        hoursAgo(23),
        9,
        false,
        [
          createComment(
            '2-1-1',
            mockUsers[7],
            'Wait, how does the emoji detection actually work? Is it purely CSS-based?',
            hoursAgo(22),
            2,
            false,
            [
              createComment(
                '2-1-1-1',
                mockUsers[5],
                "Great question! The implementation uses both CSS and a bit of JavaScript. The JS detects emoji-only content and adds a class, then CSS handles the special styling. Best of both worlds!",
                hoursAgo(21),
                1,
                false,
                [],
                '2-1-1'
              )
            ],
            '2-1'
          )
        ],
        '2'
      )
    ]
  ),
  createComment(
    '3',
    mockUsers[2],
    'The responsive design considerations are spot-on. Container queries make these components truly adaptive to their context, not just the viewport.',
    hoursAgo(12),
    15,
    false,
    [
      createComment(
        '3-1',
        mockUsers[1],
        '🔥🔥🔥',
        hoursAgo(10),
        7,
        false,
        [],
        '3'
      ),
      createComment(
        '3-2',
        mockUsers[4],
        "This is the future of component design. Instead of breakpoints based on screen size, we're styling based on the component's actual available space. Game changer!",
        hoursAgo(8),
        11,
        true,
        [],
        '3'
      )
    ]
  ),
  createComment(
    '4',
    mockUsers[7],
    'Has anyone actually implemented this in production? Would love to hear about real-world performance and browser support.',
    hoursAgo(6),
    5,
    false,
    [
      createComment(
        '4-1',
        mockUsers[3],
        "We're using a similar approach in our app! Container queries have excellent support now. The performance is great because most of the work is handled by CSS, not JavaScript.",
        hoursAgo(4),
        8,
        false,
        [
          createComment(
            '4-1-1',
            mockUsers[0],
            "That's awesome to hear! Any gotchas or lessons learned you could share?",
            hoursAgo(3),
            2,
            false,
            [],
            '4-1'
          )
        ],
        '4'
      )
    ]
  ),
  createComment(
    '5',
    mockUsers[6],
    '🚀 Ready to refactor all our comment components now!',
    hoursAgo(2),
    13,
    false,
    []
  ),
  // New comment with many replies to demonstrate "show more"
  createComment(
    '6',
    mockUsers[8],
    'This is a top-level comment with many replies. We should only show a few initially.',
    daysAgo(0.5),
    30,
    false,
    [
      createComment(
        '6-1',
        mockUsers[9],
        'Reply 1 to comment 6.',
        hoursAgo(10),
        2,
        false,
        [],
        '6'
      ),
      createComment(
        '6-2',
        mockUsers[1],
        'Reply 2 to comment 6.',
        hoursAgo(9),
        1,
        false,
        [],
        '6'
      ),
      createComment(
        '6-3',
        mockUsers[2],
        'Reply 3 to comment 6.',
        hoursAgo(8),
        0,
        false,
        [],
        '6'
      ),
      createComment(
        '6-4',
        mockUsers[3],
        'Reply 4 to comment 6. This one is hidden initially.',
        hoursAgo(7),
        0,
        false,
        [],
        '6'
      ),
      createComment(
        '6-5',
        mockUsers[4],
        'Reply 5 to comment 6. This one is also hidden initially.',
        hoursAgo(6),
        0,
        false,
        [],
        '6'
      )
    ],
    undefined,
    5 // totalReplies is 5, but we'll only show 3 initially in CommentList
  ),
  createComment(
    '7',
    mockUsers[9],
    'Another comment with a deep reply chain to test the show more functionality.',
    daysAgo(0.3),
    10,
    false,
    [
      createComment(
        '7-1',
        mockUsers[0],
        'First reply to comment 7.',
        hoursAgo(5),
        3,
        false,
        [
          createComment(
            '7-1-1',
            mockUsers[1],
            'First reply to 7-1.',
            hoursAgo(4),
            1,
            false,
            [],
            '7-1'
          ),
          createComment(
            '7-1-2',
            mockUsers[2],
            'Second reply to 7-1. Hidden initially.',
            hoursAgo(3),
            0,
            false,
            [],
            '7-1'
          )
        ],
        '7',
        2 // totalReplies for 7-1 is 2, but we'll only show 1 initially
      )
    ]
  )
];

// Helper function to flatten comments for easier processing
export const flattenComments = (comments: Comment[]): Comment[] => {
  const result: Comment[] = [];

  const flatten = (commentList: Comment[]) => {
    commentList.forEach(comment => {
      result.push(comment);
      if (comment.replies.length > 0) {
        flatten(comment.replies);
      }
    });
  };

  flatten(comments);
  return result;
};

// Get comment by ID (useful for interactions)
export const getCommentById = (comments: Comment[], id: string): Comment | null => {
  const flattened = flattenComments(comments);
  return flattened.find(comment => comment.id === id) || null;
};
