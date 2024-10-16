"use client";

import Joke from "@/app/features/joke";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && redirect("/")}>
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
