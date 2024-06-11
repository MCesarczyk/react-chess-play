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

export type PieceMove = (from: Coord, to: Coord) => boolean;

export enum PieceColour {
  BLACK = 'black',
  WHITE = 'white',
};

export interface PieceData {
  id: string;
  type: PieceType;
  colour: PieceColour;
  image: string;
  alt: string;
  icon: string;
}

export interface PieceRecord extends PieceData {
  location: Coord;
}

export interface PieceItem extends PieceRecord {
  canMovePiece: PieceMove;
}
