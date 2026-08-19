import { useState } from "react";
interface SubredditSearchProps {
  onSearch: (subreddit: string) => void;
}

export default function SubredditSearch({
  onSearch,
}: SubredditSearchProps) {
  const [value, setValue] = useState("");

  return (
    <form
  onSubmit={(event) => {
    event.preventDefault();

    const subreddit = value.trim().replace(/^r\//, "");

    if (!subreddit) return;

    onSearch(subreddit);
  } }  className="mx-auto flex w-full max-w-2xl gap-3"
>
      <div className="flex flex-1 items-center rounded-xl border border-gray-700 bg-gray-900 px-4">
        <span className="text-gray-500">r/</span>

        <input
          type="text"
          placeholder="technology"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full bg-transparent px-2 py-3 text-white outline-none placeholder:text-gray-600"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Check Vibe
      </button>
    </form>
  );
}