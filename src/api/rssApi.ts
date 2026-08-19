import axios from "axios";
import type { RSSFeed } from "../types/rss";

const RSS2JSON_BASE_URL = "https://api.rss2json.com/v1/api.json";
const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY;
export const fetchSubredditPosts = async (
  subreddit: string
): Promise<RSSFeed> => {
  const rssUrl = `https://www.reddit.com/r/${subreddit}/hot/.rss`;

  const response = await axios.get<RSSFeed>(RSS2JSON_BASE_URL, {
    params: {
    rss_url: rssUrl,
    api_key: RSS2JSON_API_KEY,
    count: 50,
  },
  });

  if (response.data.status !== "ok") {
    throw new Error("Failed to fetch subreddit data");
  }

  return response.data;
};