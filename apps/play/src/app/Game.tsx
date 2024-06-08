import { Coord } from './types';
import { PieceItem, PieceRecord } from './piece/types';
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

  public setPieces(pieces: PieceRecord[]) {
    this.pieces = pieces;
    this.emitChange();
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

  public canMovePiece = (piece: PieceItem, to: Coord) => {
    const from = piece.location;

    if (!from || !piece.canMovePiece) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[0] === from[0] &&
          p.location[1] > to[1] &&
          p.location[1] < from[1]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[0] === from[0] &&
          p.location[1] < to[1] &&
          p.location[1] > from[1]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          p.location[1] === to[1] &&
          p.location[1] === from[1] &&
          p.location[0] < to[0] &&
          p.location[0] > from[0]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          p.location[1] === to[1] &&
          p.location[1] === from[1] &&
          p.location[0] > to[0] &&
          p.location[0] < from[0]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          Math.abs(to[0] - from[0]) === Math.abs(to[1] - from[1]) &&
          Math.abs(p.location[0] - to[0]) === Math.abs(p.location[1] - to[1]) &&
          p.location[0] > to[0] &&
          p.location[0] < from[0] &&
          p.location[1] > to[1] &&
          p.location[1] < from[1]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          Math.abs(to[0] - from[0]) === Math.abs(to[1] - from[1]) &&
          Math.abs(p.location[0] - to[0]) === Math.abs(p.location[1] - to[1]) &&
          p.location[0] < to[0] &&
          p.location[0] > from[0] &&
          p.location[1] < to[1] &&
          p.location[1] > from[1]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          Math.abs(to[0] - from[0]) === Math.abs(to[1] - from[1]) &&
          Math.abs(p.location[0] - to[0]) === Math.abs(p.location[1] - to[1]) &&
          p.location[0] < to[0] &&
          p.location[0] > from[0] &&
          p.location[1] > to[1] &&
          p.location[1] < from[1]
      )
    ) {
      return false;
    }

    if (
      this.getPieces().some(
        (p) =>
          Math.abs(to[0] - from[0]) === Math.abs(to[1] - from[1]) &&
          Math.abs(p.location[0] - to[0]) === Math.abs(p.location[1] - to[1]) &&
          p.location[0] > to[0] &&
          p.location[0] < from[0] &&
          p.location[1] < to[1] &&
          p.location[1] > from[1]
      )
    ) {
      return false;
    }

    return piece.canMovePiece(from, to);
  };

  public movePiece(pieceId: string, toX: number, toY: number) {
    let coincidedPiece: PieceRecord | undefined;

    const updatedPieces: PieceRecord[] = this.pieces.map((p) => {
      if (p.id === pieceId) {
        return { ...p, location: [toX, toY] };
      }

      return p;
    });

    const currentPiece = this.findPieceByCoord([toX, toY]);
    const isSquareOccupied = Boolean(currentPiece);

    if (isSquareOccupied) {
      coincidedPiece = currentPiece;
    }

    this.pieces = updatedPieces;

    this.emitChange();

    return { coincidedPiece, updatedPieces };
  }

  public isEqualCoord(c1: Coord | undefined, c2: Coord | undefined): boolean {
    if (!c1 || !c2) {
      return false;
    }

    return c1[0] === c2[0] && c1[1] === c2[1];
  }
}
