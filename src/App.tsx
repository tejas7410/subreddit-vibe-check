import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import PostList from "./components/PostList";
import SentimentSummary from "./components/SentimentSummary";
import SubredditSearch from "./components/subRedditSearch";

function App() {
  const [subreddit, setSubreddit] = useState("technology");

  const { data, isLoading, isError, error } = usePosts(subreddit);

  return (
    <main className="min-h-screen bg-[#0b0d11] px-4 py-8 text-gray-100 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Reddit analytics
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                The Subreddit
                <span className="text-orange-400"> Vibe Check</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Analyze the sentiment and mood of the latest hot
                conversations from any subreddit.
              </p>
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-3 sm:p-4">
          <SubredditSearch onSearch={setSubreddit} />

          <div className="mt-3 px-1 text-xs text-gray-600">
            Analyzing{" "}
            <span className="font-medium text-gray-400">
              r/{subreddit}
            </span>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/50 p-12 text-center">
            <div className="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-orange-400" />

            <p className="text-sm text-gray-400">
              Fetching and analyzing posts...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="font-medium text-red-400">
              Unable to analyze this subreddit
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {error instanceof Error
                ? error.message
                : "Something went wrong."}
            </p>
          </div>
        )}

        {/* Dashboard */}
        {data && data.length > 0 && (
          <>
            {/* This renders:
                Overall Mood
                Average Sentiment Gauge
                Key Insights
                Sentiment Distribution
            */}
            <SentimentSummary posts={data} />

            {/* Hot Posts */}
            <section className="mt-12">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
                  Latest activity
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Hot Posts
                </h2>
              </div>

              <PostList posts={data} />
            </section>
          </>
        )}

        {/* Empty state */}
        {data && data.length === 0 && !isLoading && (
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/50 p-12 text-center">
            <p className="text-gray-400">
              No posts were found for this subreddit.
            </p>
          </div>
        )}

        <footer className="mt-12 border-t border-gray-900 py-6 text-center text-xs text-gray-600">
          Sentiment analysis is performed client-side on post titles.
        </footer>

      </div>
    </main>
  );
}

export default App;