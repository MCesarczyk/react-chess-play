import { Coord, PieceType } from './types';

import king from '../assets/king.png';
import pawn from '../assets/pawn.png';
import knight from '../assets/knight_b.png';
import { Piece } from './Piece';

interface PieceData {
  image: string;
  alt: string;
  canMovePiece: (from: Coord, to: Coord) => boolean;
}

const pieces = {
  [PieceType.KING]: {
    image: king,
    alt: 'King',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
    },
  },
  [PieceType.PAWN]: {
    image: pawn,
    alt: 'Pawn',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];
      const isFirstMove = from[1] === 2 || from[1] === 7;

      return Math.abs(dx) === 0 && Math.abs(dy) === (isFirstMove ? 2 : 1);
    },
  },
  [PieceType.KNIGHT]: {
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
  setDraggedPiece: (pieceType: PieceType) => void;
}

export const BoardPiece = ({ type, setDraggedPiece }: BoardPieceProps) => {
  return (
    <Piece
      type={type}
      image={pieces[type].image}
      alt={pieces[type].alt}
      setDraggedPiece={setDraggedPiece}
    />
  );
};
