import { Coord, PieceRecord } from './types';
import { PieceType } from './piece/types';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  public pieces: PieceRecord[] = [
    { type: PieceType.KING, location: [0, 4] },
    { type: PieceType.QUEEN, location: [0, 3] },
    { type: PieceType.ROOK, location: [0, 0] },
    { type: PieceType.BISHOP, location: [0, 1] },
    { type: PieceType.KNIGHT, location: [0, 2] },
    { type: PieceType.PAWN_BLACK, location: [1, 0] },
    { type: PieceType.PAWN_WHITE, location: [6, 0] },
  ];

  public draggedPiece: PieceType | null = null;

  private observers: Observer[] = [];

  private emitChange() {
    const pieces = this.pieces;
    this.observers.forEach((observer) => observer && observer(pieces));
  }

  public observe(receive: Observer) {
    this.observers.push(receive);
    this.emitChange();

    return () => {
      this.observers = this.observers.filter((obs) => obs !== receive);
    };
  }

  public movePiece(pieceType: PieceType, toX: number, toY: number) {
    const updatedPieces: PieceRecord[] = this.pieces.map((p) => {
      if (p.type === pieceType) {
        return { ...p, location: [toX, toY] };
      }

      return p;
    });

    this.pieces = updatedPieces;

    this.emitChange();
  }

  private foundPiece(pieceType: PieceType): PieceRecord | undefined {
    return this.pieces.find((p) => p.type === pieceType);
  }

  public locatePiece(pieceType: PieceType): Coord | undefined {
    const currentPiece = this.foundPiece(pieceType);
    if (!currentPiece) {
      return;
    }

    return currentPiece.location;
  }

  public isEqualCoord(c1: Coord | undefined, c2: Coord | undefined): boolean {
    if (!c1 || !c2) {
      return false;
    }

    return c1[0] === c2[0] && c1[1] === c2[1];
  }
}
