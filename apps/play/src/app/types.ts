import { PieceData, PieceRecord } from "./piece/types";

export type Coord = [number, number];

export type Destination = { row: number, col: number };

export interface GameState {
  pieces: PieceRecord[];
  capturedPieces: PieceData[];
  enPassant: Coord | null;
}
