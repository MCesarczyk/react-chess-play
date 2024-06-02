import { Coord, PieceData, PieceType } from './types';

import king from '../assets/king.png';
import pawn from '../assets/pawn.png';
import knight from '../assets/knight_b.png';
import { Piece } from './Piece';

const pieces = {
  [PieceType.KING]: {
    type: PieceType.KING,
    image: king,
    alt: 'King',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
    },
  },
  [PieceType.PAWN]: {
    type: PieceType.PAWN,
    image: pawn,
    alt: 'Pawn',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[1] - from[1];
      const dy = to[0] - from[0];
      const isFirstMove = from[0] === 6;

      return Math.abs(dx) === 0 && dy >= (isFirstMove ? -2 : -1) && dy < 0;
    },
  },
  [PieceType.KNIGHT]: {
    type: PieceType.KNIGHT,
    image: knight,
    alt: 'Knight',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      );
    },
  },
};

export const findPiece = (type: PieceType): PieceData => pieces[type];

interface BoardPieceProps {
  type: PieceType;
}

export const BoardPiece = ({ type }: BoardPieceProps) => {
  return (
    <Piece
      type={type}
      image={pieces[type].image}
      alt={pieces[type].alt}
      canMovePiece={pieces[type].canMovePiece}
    />
  );
};
