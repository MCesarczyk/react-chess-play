import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';

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
  type: PieceType;
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

function renderSquares(
  pieces: PieceRecord[],
  onSquareClick: (coord: Coord) => void
) {
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
          onClick={() => onSquareClick(squareCoord)}
        >
          {piece && pieceLookup[piece.type]()}
        </div>
      );
    }
  }
  return squares;
}

export function canMoveKnight(from: Coord, to: Coord) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}

export function movePiece(
  pieces: PieceRecord[],
  piece: PieceType,
  to: Coord
): PieceRecord[] {
  const matchingPiece = pieces.find((p) => p.type === piece);
  const restPieces = pieces.filter((p) => p.type !== piece);

  return matchingPiece
    ? [...restPieces, { ...matchingPiece, location: to }]
    : pieces;
}

export function App() {
  const [pieces, setPieces] = useState<PieceRecord[]>([
    // { type: 'king', location: [3, 2] },
    // { type: 'pawn', location: [1, 6] },
    { type: 'knight', location: [4, 4] },
  ]);

  const handleSquareClick = (coord: Coord) => {
    const knight = pieces.find((p) => p.type === 'knight');

    if (knight && canMoveKnight(knight.location, coord)) {
      console.log('Moving knight to:', coord);

      setPieces(movePiece(pieces, 'knight', coord));
    }
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {renderSquares(pieces, handleSquareClick)}
    </div>
  );
}

function Piece({ type, image, alt }: PieceProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      className={clsx(
        'p-1 m-2 rounded-lg shadow-xl bg-gray-400 hover:bg-gray-600',
        isDragging && 'opacity-50 bg-opacity-50 border-2'
      )}
      height="80%"
      width="80%"
      src={image}
      alt={alt}
      draggable="false"
    />
  ); // draggable set to false to prevent dragging of the images
}

export function King() {
  return <Piece type="king" image={king} alt="King" />;
}

export function Pawn() {
  return <Piece type="pawn" image={pawn} alt="Pawn" />;
}

export function Knight() {
  return <Piece type="knight" image={knight} alt="Knight" />;
}
