'use client';

import { useState } from 'react';
import CommentList from '../components/CommentList';
import { mockComments } from '../data/mockComments';

export default function Home() {
  const [comments, setComments] = useState(mockComments);

  const handleLike = (commentId: string) => {
    // TODO: Implement like functionality
    console.log('Like comment:', commentId);
  };

  const handleReply = (commentId: string) => {
    // TODO: Implement reply functionality
    console.log('Reply to comment:', commentId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Modern Comment Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Built with semantic HTML, modern CSS, and React
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Discussion ({comments.length} comments)
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            <CommentList
              comments={comments}
              onLike={handleLike}
              onReply={handleReply}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
