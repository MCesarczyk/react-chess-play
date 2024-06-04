import { Coord } from '../types';
import { PieceMove, PieceType } from './types';

const availableMoves = {
  [PieceType.KING]: (from: Coord, to: Coord) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];

    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
  },
  [PieceType.QUEEN]: (from: Coord, to: Coord) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];

    return (
      Math.abs(dx) === Math.abs(dy) ||
      dx === 0 ||
      dy === 0
    );
  },
  [PieceType.ROOK]: (from: Coord, to: Coord) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];

    return dx === 0 || dy === 0;
  },
  [PieceType.BISHOP]: (from: Coord, to: Coord) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];

    return Math.abs(dx) === Math.abs(dy);
  },
  [PieceType.KNIGHT]: (from: Coord, to: Coord) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  },
  [PieceType.PAWN_BLACK]: (from: Coord, to: Coord) => {
    const dx = to[1] - from[1];
    const dy = to[0] - from[0];
    const isFirstMove = from[0] === 1;

    return Math.abs(dx) === 0 && dy <= (isFirstMove ? 2 : 1) && dy > 0;
  },
  [PieceType.PAWN_WHITE]: (from: Coord, to: Coord) => {
    const dx = to[1] - from[1];
    const dy = to[0] - from[0];
    const isFirstMove = from[0] === 6;

    return Math.abs(dx) === 0 && dy >= (isFirstMove ? -2 : -1) && dy < 0;
  },
};

export const findPieceMove = (type: PieceType): PieceMove =>
  availableMoves[type];
