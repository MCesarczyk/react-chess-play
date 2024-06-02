export enum PieceType {
  KNIGHT = 'knight',
  PAWN = 'pawn',
  KING = 'king',
}

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
}
