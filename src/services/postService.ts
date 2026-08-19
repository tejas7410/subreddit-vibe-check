import { fetchSubredditPosts } from "../api/rssApi";
import type { RedditPost } from "../types/rss";

const decodeHtmlEntities = (value: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
};

const cleanAuthor = (author: string): string => {
  return author
    .replace(/^u\/+/i, "")
    .replace(/^\/u\/+/i, "")
    .trim();
};

export const getSubredditPosts = async (
  subreddit: string
): Promise<RedditPost[]> => {
  const response = await fetchSubredditPosts(subreddit);

  return response.items.map((item) => ({
    id: item.guid,
    title: decodeHtmlEntities(item.title).trim(),
    author: cleanAuthor(decodeHtmlEntities(item.author)),
    url: item.link,
    publishedAt: item.pubDate,
    description: decodeHtmlEntities(item.description).trim(),
    thumbnail: item.thumbnail || undefined,
  }));
};