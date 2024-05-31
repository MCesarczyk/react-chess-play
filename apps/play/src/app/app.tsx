import { ReactElement, useState } from 'react';
import { useDrop } from 'react-dnd';
import { King, Knight, Pawn } from './Piece';
import { Square } from './Square';
import { Coord } from '../types';

export type PieceType = 'king' | 'pawn' | 'knight';

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

function BoardSquare({
  row,
  col,
  piece,
  onSquareClick,
}: {
  row: number;
  col: number;
  piece: PieceRecord | undefined;
  onSquareClick: (coord: Coord) => void;
}) {
  const isDark = (row + col) % 2 === 1;
  const squareCoord: Coord = [row, col];

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'knight',
      drop: () => onSquareClick(squareCoord),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [row, col]
  );

  const pieceLookup: {
    [Key in PieceType]: () => ReactElement;
  } = {
    king: () => <King />,
    pawn: () => <Pawn />,
    knight: () => <Knight />,
  };

  return (
    <Square row={row} col={col} isDark={isDark}>
      {piece && pieceLookup[piece.type]()}
    </Square>
  );
}

// function renderSquares(
//   pieces: PieceRecord[],
//   onSquareClick: (coord: Coord) => void
// ) {
//   const squares = [];
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       const squareCoord: Coord = [row, col];

//       const piece = pieces.find((piece) =>
//         isEqualCoord(piece.location, squareCoord)
//       );

//       squares.push(
//         <BoardSquare
//           key={`${row}-${col}`}
//           {...{
//             row,
//             col,
//             piece,
//             onSquareClick,
//           }}
//         />
//       );
//     }
//   }
//   return squares;
// }

export function canMoveKnight(from: Coord, to: Coord) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}

export function App() {
  const [pieces, setPieces] = useState<PieceRecord[]>([
    // { type: 'king', location: [3, 2] },
    // { type: 'pawn', location: [1, 6] },
    { type: 'knight', location: [4, 4] },
  ]);

  function movePiece(pieces: PieceRecord[], piece: PieceType, to: Coord): void {
    const matchingPiece = pieces.find((p) => p.type === piece);
    const restPieces = pieces.filter((p) => p.type !== piece);

    setPieces(
      matchingPiece
        ? [...restPieces, { ...matchingPiece, location: to }]
        : pieces
    );
  }

  const knight = pieces.find((p) => p.type === 'knight');

  const handleSquareClick = (coord: Coord) => {
    if (knight && canMoveKnight(knight.location, coord)) {
      console.log('Moving knight to:', coord);

      movePiece(pieces, 'knight', coord);
    }
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {/* {renderSquares(pieces, handleSquareClick)} */}
    </div>
  );
}
