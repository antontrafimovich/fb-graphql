import Joke from '@/app/features/joke';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

export default function HomeJoke({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <Dialog defaultOpen>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <Joke index={Number(slug)}></Joke>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
