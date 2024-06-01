import { Coord, PieceRecord, PieceType } from './types';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  public pieces: PieceRecord[] = [
    { type: PieceType.KNIGHT, location: [3, 2] },
    { type: PieceType.PAWN, location: [1, 6] },
    { type: PieceType.KING, location: [4, 4] },
  ];

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

  public canMovePiece(pieceType: PieceType, toX: number, toY: number) {
    const currentPiece = this.foundPiece(pieceType);
    if (!currentPiece) {
      return false;
    }

    const [x, y] = currentPiece.location;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  public isEqualCoord(c1: Coord | undefined, c2: Coord | undefined): boolean {
    if (!c1 || !c2) {
      return false;
    }

    return c1[0] === c2[0] && c1[1] === c2[1];
  }
}
