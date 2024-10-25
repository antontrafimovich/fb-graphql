import Link from "next/link";
import data from "../../data/jokes.json";

export default function Page() {
  return (
    <ul>
      {data.jokes.map((joke, index) => (
        <li key={index}>
          <Link href={`/jokes/${index}`}>{index}</Link>
        </li>
      ))}
    </ul>
  );
}
