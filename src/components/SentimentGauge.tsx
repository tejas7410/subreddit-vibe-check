interface SentimentGaugeProps {
  score: number;
}

export default function SentimentGauge({
  score,
}: SentimentGaugeProps) {
  const clampedScore = Math.max(-5, Math.min(5, score));

  // -5 = 0°, 0 = 90°, +5 = 180°
  const angle = ((clampedScore + 5) / 10) * 180;

  const needleX = 100 + 75 * Math.cos((Math.PI * angle) / 180);
  const needleY = 100 - 75 * Math.sin((Math.PI * angle) / 180);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-64">
        <svg
          viewBox="0 0 200 120"
          className="h-full w-full overflow-visible"
        >
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1f2937"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Red side */}
          <path
            d="M 20 100 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="#ef4444"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Green side */}
          <path
            d="M 100 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#22c55e"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Tick marks */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (tick) => {
              const tickAngle = (tick / 10) * 180;

              const outerX =
                100 +
                82 *
                  Math.cos(
                    (Math.PI * tickAngle) / 180
                  );

              const outerY =
                100 -
                82 *
                  Math.sin(
                    (Math.PI * tickAngle) / 180
                  );

              const innerX =
                100 +
                72 *
                  Math.cos(
                    (Math.PI * tickAngle) / 180
                  );

              const innerY =
                100 -
                72 *
                  Math.sin(
                    (Math.PI * tickAngle) / 180
                  );

              return (
                <line
                  key={tick}
                  x1={innerX}
                  y1={innerY}
                  x2={outerX}
                  y2={outerY}
                  stroke="#6b7280"
                  strokeWidth="1.5"
                />
              );
            }
          )}

          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={needleX}
            y2={needleY}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle
            cx="100"
            cy="100"
            r="7"
            fill="white"
          />
        </svg>

        <span className="absolute bottom-0 left-2 text-xs font-semibold text-red-400">
          -5
        </span>

        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
          0
        </span>

        <span className="absolute bottom-0 right-2 text-xs font-semibold text-green-400">
          +5
        </span>
      </div>

      <div className="-mt-3 text-3xl font-bold text-white">
        {score > 0 ? "+" : ""}
        {score.toFixed(2)}
      </div>

      <p className="mt-1 text-sm text-gray-500">
        Average sentiment
      </p>
    </div>
  );
}