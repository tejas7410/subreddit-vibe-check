import Sentiment from "sentiment";

const sentiment = new Sentiment();

export type SentimentLabel = "Positive" | "Negative" | "Neutral";

export interface SentimentResult {
  score: number;
  comparative: number;
  label: SentimentLabel;
}

export const analyzeSentiment = (
  title: string
): SentimentResult => {
  const result = sentiment.analyze(title);

  let label: SentimentLabel = "Neutral";

  if (result.score > 0) {
    label = "Positive";
  } else if (result.score < 0) {
    label = "Negative";
  }

  return {
    score: result.score,
    comparative: result.comparative,
    label,
  };
};