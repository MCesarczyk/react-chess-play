import { Coord } from '../types';
import { Knight } from './Piece';
import { Square } from './Square';

export type PieceType = 'king' | 'pawn' | 'knight';

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

function renderSquare(row: number, col: number, knightPosition: Coord) {
  const isKnightHere = isEqualCoord(knightPosition, [row, col]);
  const isDark = (row + col) % 2 === 1;

  return (
    <Square
      key={`${row}-${col}`}
      {...{
        row,
        col,
        isDark,
        // onSquareClick,
      }}
    >
      {isKnightHere && <Knight />}
    </Square>
  );
}

interface BoardProps {
  knightPosition: Coord;
}

export const Board = ({ knightPosition }: BoardProps) => {
  const squares: JSX.Element[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col, knightPosition));
    }
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {squares}
    </div>
  );
};
