import data from "@/app/data/jokes.json";

export default function Joke({ index }: { index: number }) {
  return <div>{data.jokes[index]}</div>;
}
