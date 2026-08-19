import type { RedditPost } from "../types/rss";
import PostCard from "./PostCard";

interface PostListProps {
  posts: RedditPost[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}