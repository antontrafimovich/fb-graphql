// generate array with 3 jokes as strings
import Joke from '@/app/features/joke';

export default function JokePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <Joke index={Number(slug)} />;
}
