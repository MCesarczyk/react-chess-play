import { Coord } from './types';
import { PieceMove, PieceRecord } from './piece/types';
import { initialPieces } from './piece/initialPieces';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  private pieces: PieceRecord[] = initialPieces;

  private observers: Observer[] = [];

  private emitChange() {
    const pieces = this.pieces;
    this.observers.forEach((observer) => observer && observer(pieces));
  }

  private findPieceById(pieceId: string): PieceRecord | undefined {
    return this.pieces.find((p) => p.id === pieceId);
  }

  public findPieceByCoord(coord: Coord): PieceRecord | undefined {
    return this.pieces.find(
      (p) => p.location[0] === coord[0] && p.location[1] === coord[1]
    );
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
    const currentPiece = this.findPieceById(pieceId);
    if (!currentPiece) {
      return;
    }

    return currentPiece.location;
  }

  public canMovePiece = (
    pieceId: string,
    pieceMove: PieceMove,
    destination: Coord
  ) => {
    const from = this.locatePiece(pieceId);

    const currentPiece = this.findPieceByCoord(destination);
    const isSquareOccupied = Boolean(currentPiece);

    if (!from || !pieceMove || isSquareOccupied) {
      return false;
    }

    return pieceMove(from, destination);
  };

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
