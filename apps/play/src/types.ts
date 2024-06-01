export enum PieceType {
  KNIGHT = 'knight'
}

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};
