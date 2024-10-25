import { Suspense } from "react";

import PlayersListServer from "./players-list-server";
import { locales } from "@/app/dictionaries/locales/locales";

const Players = async ({
  params: { lang },
}: {
  params: { lang: keyof typeof locales };
}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading players...</div>}>
        <PlayersListServer lang={lang} />
      </Suspense>
    </div>
  );
};

export default Players;
