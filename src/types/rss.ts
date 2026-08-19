export interface RSSItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  description: string;
  content: string;
  thumbnail: string;
}

export interface RSSFeed {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    description: string;
    language: string;
    image: string;
  };
  items: RSSItem[];
}

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  url: string;
  publishedAt: string;
  description: string;
  thumbnail?: string;
}