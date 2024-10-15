import Link from "next/link";
import data from "./data/jokes.json";

export default function Home() {
  return (
    <div>
      <h1>This is home page</h1>
      <ul>
        {data.jokes.map((joke, index) => (
          <li key={index}>
            <Link href={`/jokes/${index}`}>{index}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
