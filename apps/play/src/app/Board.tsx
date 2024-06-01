import { useEffect, useState } from 'react';
import { Game } from '../Game';
import { Coord } from '../types';
import { BoardSquare } from './BoardSquare';
import { Knight } from './Piece';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const [knightPosition, setKnightPosition] = useState<Coord>(
    game.knightPosition
  );

  useEffect(() => game.observe(setKnightPosition), [game]);

  function renderSquare(row: number, col: number) {
    const isKnightHere = game.isEqualCoord(knightPosition, [row, col]);

    return (
      <BoardSquare key={`${row}-${col}`} row={row} col={col} game={game}>
        {isKnightHere && <Knight />}
      </BoardSquare>
    );
  }

  const squares: JSX.Element[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {squares}
    </div>
  );
};
