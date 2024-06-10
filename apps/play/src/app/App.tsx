import { useMemo } from 'react';
import { Game } from './Game';
import { Page } from './Page';

export const App = () => {
  const game = useMemo(() => new Game(), []);

  return <Page game={game} />;
};
