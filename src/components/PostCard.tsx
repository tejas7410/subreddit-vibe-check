import type { RedditPost } from "../types/rss";
import { analyzeSentiment } from "../services/sentimentService";

interface PostCardProps {
  post: RedditPost;
}

export default function PostCard({ post }: PostCardProps) {
  const sentiment = analyzeSentiment(post.title);

  const sentimentStyle = {
    Positive: "bg-green-500/10 text-green-400 border-green-500/20",
    Negative: "bg-red-500/10 text-red-400 border-red-500/20",
    Neutral: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <article className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5 transition hover:border-gray-700 hover:bg-gray-900">
      <h2 className="text-lg font-semibold leading-7 text-gray-100">
        {post.title}
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span>u/{post.author}</span>

        <span>•</span>

        <span>
          {new Date(post.publishedAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            sentimentStyle[sentiment.label]
          }`}
        >
          {sentiment.label} · {sentiment.score}
        </span>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-400 hover:text-orange-300"
        >
          View on Reddit →
        </a>
      </div>
    </article>
  );
}