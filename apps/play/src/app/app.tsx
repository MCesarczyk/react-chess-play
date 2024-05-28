import { ReactElement } from 'react';
import clsx from 'clsx';

import king from '../assets/king.png';
import pawn from '../assets/pawn.png';
import knight from '../assets/knight_b.png';

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export type PieceType = 'king' | 'pawn' | 'knight';

type PieceProps = {
  image: string;
  alt: string;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export const pieceLookup: {
  [Key in PieceType]: () => ReactElement;
} = {
  king: () => <King />,
  pawn: () => <Pawn />,
  knight: () => <Knight />,
};

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];

      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCoord)
      );

      const isDark = (row + col) % 2 === 1;

      squares.push(
        <div
          key={`${row}-${col}`}
          className={clsx(
            'w-full h-full grid place-items-center',
            isDark ? 'bg-gray-700' : 'bg-white'
          )}
        >
          {piece && pieceLookup[piece.type]()}
        </div>
      );
    }
  }
  return squares;
}

export function App() {
  const pieces: PieceRecord[] = [
    // { type: 'king', location: [3, 2] },
    // { type: 'pawn', location: [1, 6] },
    { type: 'knight', location: [4, 4] },
  ];

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {renderSquares(pieces)}
    </div>
  );
}

function Piece({ image, alt }: PieceProps) {
  return (
    <img
      className="p-1 m-2 rounded-lg shadow-xl bg-gray-400 hover:bg-gray-600"
      height="80%"
      width="80%"
      src={image}
      alt={alt}
      draggable="false"
    />
  ); // draggable set to false to prevent dragging of the images
}

export function King() {
  return <Piece image={king} alt="King" />;
}

export function Pawn() {
  return <Piece image={pawn} alt="Pawn" />;
}

export function Knight() {
  return <Piece image={knight} alt="Knight" />;
}
