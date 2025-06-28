import { useState } from "react";

type Post = {
  title: string;
  slug: string;
  brief: string;
  coverImage: {
    url: string;
  } | null;
  cuid: string;
};

interface WritingListProps {
  posts: Post[];
  error: string | null;
  loading: boolean;
  onPostSelect: (post: Post) => void;
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-zinc-800 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-zinc-700 rounded flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-zinc-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function WritingList({ posts, error, loading, onPostSelect }: WritingListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="fixed left-[300px] top-0 w-[350px] h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-white">My Writings</h1>
        <p className="text-gray-400 mb-4 text-sm">Articles and posts from my Hashnode blog.</p>
        <a target="_blank" rel="noreferrer" href="https://thestudentdev.hashnode.dev" className="text-blue-400 italic text-sm">
          Visit Hashnode
        </a>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4 text-white">All Posts</h2>

          {error ? (
            <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
              <p className="font-medium">Error loading writings</p>
              <p className="text-sm opacity-80 mt-1">{error}</p>
            </div>
          ) : loading ? (
            <LoadingSkeleton />
          ) : posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No posts available.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post: Post) => (
                <div
                  key={post.cuid}
                  className={`p-4 rounded-lg block cursor-pointer transition-colors ${
                    selectedId === post.cuid ? 'bg-blue-500 hover:bg-blue-400' : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  onClick={() => {
                    setSelectedId(post.cuid);
                    onPostSelect(post);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {post.coverImage?.url && (
                      <img
                        src={post.coverImage.url}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="w-14 h-14 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className={`font-medium mb-1 text-[15px] ${selectedId === post.cuid ? 'text-black' : 'text-white'}`}>
                        {post.title}
                      </h3>
                      <div className={`text-[12px] space-x-2 ${selectedId === post.cuid ? 'text-black/70' : 'text-gray-400'}`}>
                        {post.brief}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #171717;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
}
