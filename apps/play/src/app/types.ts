export enum PieceType {
  KNIGHT = 'knight',
  PAWN = 'pawn',
  KING = 'king',
}

export type Coord = [number, number];

export interface PieceRecord {
  type: PieceType;
  location: Coord;
}

export interface PieceData {
  type: PieceType;
  image: string;
  alt: string;
  canMovePiece: (from: Coord, to: Coord) => boolean;
}
