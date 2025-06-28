'use client';

import { useEffect, useState } from 'react';
import WritingList from '../ui/WritingList';


type Post = {
  title: string;
  slug: string;
  brief: string;
  coverImage: {
    url: string;
  } | null;
  cuid: string;
};


type FullPost = {
  title: string;
  content: {
    html: string;
  };
};

export default function WritingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<FullPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  async function fetchPosts() {
    try {
      const res = await fetch('/api/getWritings');
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load posts.');
      } else {
        setPosts(data);
      }
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }
  fetchPosts();
}, []);


  async function handlePostSelect(post: Post) {
    setPostLoading(true);
    try {
      const res = await fetch(`/api/getWritingsBySlug?slug=${post.slug}`);
      const data = await res.json();
      if (!res.ok) {
        console.error("API Error Response:", data);
        setError(data.error || 'Failed to load post content.');
      } else {
        setSelectedPost(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to load post content.');
    } finally {
      setPostLoading(false);
    }
  }

  return (
    <div className="flex flex-1 min-h-screen">
      <WritingList
        posts={posts}
        error={error}
        loading={loading}
        onPostSelect={handlePostSelect}
      />
      <div className="flex-1 flex flex-col bg-[#111111] text-white p-10 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto">
          {!selectedPost ? (
            <div className="text-gray-400 text-lg">Select a post to read</div>
          ) : postLoading ? (
            <p className="animate-pulse text-gray-500">Loading article...</p>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content.html }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
