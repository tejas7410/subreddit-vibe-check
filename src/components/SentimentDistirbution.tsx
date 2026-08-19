interface SentimentDistributionProps {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentDistribution({
  positive,
  neutral,
  negative,
}: SentimentDistributionProps) {
  const total = positive + neutral + negative;

  const getPercentage = (value: number) =>
    total === 0
      ? 0
      : Math.round((value / total) * 100);

  const data = [
    {
      label: "Negative",
      value: getPercentage(negative),
      color: "bg-red-500",
      text: "text-red-400",
    },
    {
      label: "Neutral",
      value: getPercentage(neutral),
      color: "bg-gray-500",
      text: "text-gray-400",
    },
    {
      label: "Positive",
      value: getPercentage(positive),
      color: "bg-green-500",
      text: "text-green-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Analytics
        </p>

        <h2 className="mt-1 text-xl font-bold text-white">
          Sentiment Distribution
        </h2>
      </div>

      <div className="flex h-64 items-end justify-center gap-12 border-b border-gray-800 px-4 sm:gap-24">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex h-full w-16 flex-col items-center justify-end"
          >
            <span
              className={`mb-2 text-sm font-bold ${item.text}`}
            >
              {item.value}%
            </span>

            <div
              className={`w-full rounded-t-lg ${item.color} transition-all duration-700`}
              style={{
                height: `${Math.max(item.value, 3)}%`,
              }}
            />

            <span className="mt-3 whitespace-nowrap text-xs text-gray-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}