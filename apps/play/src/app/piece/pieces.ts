import { Coord } from '../types';
import { PieceType } from './types';
import kingBlack from './assets/king_b.png';
import queenBlack from './assets/queen_b.png';
import rookBlack from './assets/rook_b.png';
import bishopBlack from './assets/bishop_b.png';
import knightBlack from './assets/knight_b.png';
import pawnBlack from './assets/pawn_b.png';

export const pieces = {
  [PieceType.KING]: {
    type: PieceType.KING,
    image: kingBlack,
    alt: 'King',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
    },
  },
  [PieceType.QUEEN]: {
    type: PieceType.QUEEN,
    image: queenBlack,
    alt: 'Queen',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return (
        Math.abs(dx) === Math.abs(dy) ||
        dx === 0 ||
        dy === 0
      );
    },
  },
  [PieceType.ROOK]: {
    type: PieceType.ROOK,
    image: rookBlack,
    alt: 'Rook',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return dx === 0 || dy === 0;
    },
  },
  [PieceType.BISHOP]: {
    type: PieceType.BISHOP,
    image: bishopBlack,
    alt: 'Bishop',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];

      return Math.abs(dx) === Math.abs(dy);
    },
  },
  [PieceType.KNIGHT]: {
    type: PieceType.KNIGHT,
    image: knightBlack,
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
  [PieceType.PAWN]: {
    type: PieceType.PAWN,
    image: pawnBlack,
    alt: 'Pawn',
    canMovePiece: (from: Coord, to: Coord) => {
      const dx = to[1] - from[1];
      const dy = to[0] - from[0];
      const isFirstMove = from[0] === 1;

      return Math.abs(dx) === 0 && dy <= (isFirstMove ? 2 : 1) && dy > 0;
    },
  },
};
