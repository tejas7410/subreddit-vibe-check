import type { RedditPost } from "../types/rss";
import { analyzeSentiment } from "../services/sentimentService";
import SentimentGauge from "./SentimentGauge";
import SentimentDistribution from "./SentimentDistirbution";

interface SentimentSummaryProps {
  posts: RedditPost[];
}

export default function SentimentSummary({
  posts,
}: SentimentSummaryProps) {
  const results = posts.map((post) =>
    analyzeSentiment(post.title)
  );

  const positive = results.filter(
    (r) => r.label === "Positive"
  ).length;

  const neutral = results.filter(
    (r) => r.label === "Neutral"
  ).length;

  const negative = results.filter(
    (r) => r.label === "Negative"
  ).length;

  const average =
    results.length === 0
      ? 0
      : results.reduce(
          (sum, result) => sum + result.score,
          0
        ) / results.length;

  const overall =
    average > 0
      ? "Positive"
      : average < 0
        ? "Negative"
        : "Neutral";

  const overallPositive = overall === "Positive";

  return (
    <section className="mt-8 space-y-6">
      {/* Top analytics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Overall mood */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Overall mood
          </p>

          <div
            className={`mt-5 flex min-h-44 items-center justify-center rounded-xl border ${
              overallPositive
                ? "border-green-500/30 bg-green-500/10"
                : "border-red-500/30 bg-red-500/10"
            }`}
          >
            <div className="text-center">
              <div className="mb-3 text-5xl">
                {overallPositive ? "😊" : "😟"}
              </div>

              <h2
                className={`text-3xl font-black tracking-wide ${
                  overallPositive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {overall.toUpperCase()}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Community vibe
              </p>
            </div>
          </div>
        </div>

        {/* Gauge */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Average sentiment
          </p>

          <div className="mt-4">
            <SentimentGauge score={average} />
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Key insights
          </p>

          <div className="mt-5 space-y-3">
            <Insight
              label="Positive"
              value={positive}
              total={results.length}
              className="text-green-400"
            />

            <Insight
              label="Neutral"
              value={neutral}
              total={results.length}
              className="text-gray-400"
            />

            <Insight
              label="Negative"
              value={negative}
              total={results.length}
              className="text-red-400"
            />
          </div>
        </div>
      </div>

      {/* Distribution */}
      <SentimentDistribution
        positive={positive}
        neutral={neutral}
        negative={negative}
      />
    </section>
  );
}

interface InsightProps {
  label: string;
  value: number;
  total: number;
  className: string;
}

function Insight({
  label,
  value,
  total,
  className,
}: InsightProps) {
  const percentage =
    total === 0
      ? 0
      : Math.round((value / total) * 100);

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-800/40 px-4 py-4">
      <span className={`font-medium ${className}`}>
        {label}
      </span>

      <span className="font-bold text-white">
        {percentage}%
      </span>
    </div>
  );
}