import { PieceColour, PieceType } from "./piece/types";

export type Coord = [number, number];

export interface PieceRecord {
  id: string;
  type: PieceType;
  colour: PieceColour;
  location: Coord;
}
