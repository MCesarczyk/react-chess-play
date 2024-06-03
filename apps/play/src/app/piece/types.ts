import { Coord } from "../types";

export enum PieceType {
  KING = 'king',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  PAWN_BLACK = 'pawn_black',
  PAWN_WHITE = 'pawn_white',
}

export interface PieceData {
  type: PieceType;
  image: string;
  alt: string;
  canMovePiece: (from: Coord, to: Coord) => boolean;
}

export type PieceColour = 'white' | 'black';

export interface PieceItem extends PieceData {
  id: string;
  colour: PieceColour;
}
