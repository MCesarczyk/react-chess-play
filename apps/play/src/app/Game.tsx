import { Coord } from './types';
import { PieceRecord, PieceType } from './piece/types';
import { initialPieces } from './piece/initialPieces';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  public pieces: PieceRecord[] = initialPieces;

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

  public movePiece(pieceId: string, toX: number, toY: number) {
    const updatedPieces: PieceRecord[] = this.pieces.map((p) => {
      if (p.id === pieceId) {
        return { ...p, location: [toX, toY] };
      }

      return p;
    });

    this.pieces = updatedPieces;

    this.emitChange();
  }

  private findPiece(pieceId: string): PieceRecord | undefined {
    return this.pieces.find((p) => p.id === pieceId);
  }

  public locatePiece(pieceId: string): Coord | undefined {
    const currentPiece = this.findPiece(pieceId);
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
