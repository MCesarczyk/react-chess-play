import { useMemo } from 'react';
import { Game } from './Game';
import { Board } from './Board';

export const App = () => {
  const game = useMemo(() => new Game(), []);

  return <Board game={game} />;
};
