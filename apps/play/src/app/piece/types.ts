import { Coord } from "../types";

export enum PieceType {
  KNIGHT = 'knight',
  PAWN = 'pawn',
  KING = 'king',
}

export interface PieceData {
  type: PieceType;
  image: string;
  alt: string;
  canMovePiece: (from: Coord, to: Coord) => boolean;
}
