import { Coord } from '../types';

export type PieceType = 'king' | 'pawn' | 'knight';

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

//   const pieceLookup: {
//     [Key in PieceType]: () => ReactElement;
//   } = {
//     king: () => <King />,
//     pawn: () => <Pawn />,
//     knight: () => <Knight />,
//   };

export function canMoveKnight(from: Coord, to: Coord) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}

export function App() {
  // const [pieces, setPieces] = useState<PieceRecord[]>([
  //   // { type: 'king', location: [3, 2] },
  //   // { type: 'pawn', location: [1, 6] },
  //   { type: 'knight', location: [4, 4] },
  // ]);

  // function movePiece(pieces: PieceRecord[], piece: PieceType, to: Coord): void {
  //   const matchingPiece = pieces.find((p) => p.type === piece);
  //   const restPieces = pieces.filter((p) => p.type !== piece);

  //   setPieces(
  //     matchingPiece
  //       ? [...restPieces, { ...matchingPiece, location: to }]
  //       : pieces
  //   );
  // }

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-max h-max max-w-xl aspect-square border-4 border-gray-500">
      {/* {renderSquares(pieces, handleSquareClick)} */}
    </div>
  );
}
