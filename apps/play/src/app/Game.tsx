import { Coord } from './types';
import { PieceRecord } from './piece/types';
import { initialPieces } from './piece/initialPieces';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  private pieces: PieceRecord[] = initialPieces;

  private observers: Observer[] = [];

  private emitChange() {
    const pieces = this.pieces;
    this.observers.forEach((observer) => observer && observer(pieces));
  }

  private findPiece(pieceId: string): PieceRecord | undefined {
    return this.pieces.find((p) => p.id === pieceId);
  }

  public getPieces(): PieceRecord[] {
    return this.pieces;
  }

  public observe(receive: Observer) {
    this.observers.push(receive);
    this.emitChange();

    return () => {
      this.observers = this.observers.filter((obs) => obs !== receive);
    };
  }

  public locatePiece(pieceId: string): Coord | undefined {
    const currentPiece = this.findPiece(pieceId);
    if (!currentPiece) {
      return;
    }

    return currentPiece.location;
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

  public isEqualCoord(c1: Coord | undefined, c2: Coord | undefined): boolean {
    if (!c1 || !c2) {
      return false;
    }

    return c1[0] === c2[0] && c1[1] === c2[1];
  }
}
