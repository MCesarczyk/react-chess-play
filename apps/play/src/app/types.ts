import { PieceType } from "./piece/types";

export type Coord = [number, number];

export interface PieceRecord {
  type: PieceType;
  location: Coord;
}
