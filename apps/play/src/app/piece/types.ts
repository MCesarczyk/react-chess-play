import { Coord } from "../types";

export enum PieceType {
  KING = 'king',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  PAWN = 'pawn',
}

export interface PieceData {
  type: PieceType;
  image: string;
  alt: string;
  canMovePiece: (from: Coord, to: Coord) => boolean;
}
