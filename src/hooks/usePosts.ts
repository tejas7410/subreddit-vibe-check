import { useQuery } from "@tanstack/react-query";
import { getSubredditPosts } from "../services/postService";

export const usePosts = (subreddit: string) => {
  return useQuery({
    queryKey: ["subreddit-posts", subreddit],
    queryFn: () => getSubredditPosts(subreddit),
    enabled: Boolean(subreddit),
  });
};