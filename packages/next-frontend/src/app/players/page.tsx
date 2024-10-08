import { Suspense } from 'react';

import PlayersListServer from './players-list-server';

const Players = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading players...</div>}>
        <PlayersListServer />
      </Suspense>
    </div>
  );
};

export default Players;
