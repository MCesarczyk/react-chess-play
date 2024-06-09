import { Coord, Destination, GameState } from './types';
import {
  PieceColour,
  PieceData,
  PieceItem,
  PieceRecord,
  PieceType,
} from './piece/types';
import { initialPieces } from './piece/initialPieces';

type Observer = ((gameState: GameState) => void) | null;

export class Game {
  private pieces: PieceRecord[] = initialPieces;
  private capturedPieces: PieceData[] = [];
  private enPassant: Coord | null = null;

  private observers: Observer[] = [];

  private emitChange() {
    const gameState = {
      pieces: this.pieces,
      capturedPieces: this.capturedPieces,
      enPassant: this.enPassant,
    };
    this.observers.forEach((observer) => observer && observer(gameState));
  }

  private findPieceById(pieceId: string): PieceRecord | undefined {
    return this.pieces.find((p) => p.id === pieceId);
  }

  public findPieceByCoord(coord: Coord): PieceRecord | undefined {
    return this.pieces.find(
      (p) => p.location[0] === coord[0] && p.location[1] === coord[1]
    );
  }

  private getPieces(): PieceRecord[] {
    return this.pieces;
  }

  public getGameState(): GameState {
    return {
      pieces: this.pieces,
      capturedPieces: [],
      enPassant: null,
    };
  }

  public setGameState(gameState: GameState) {
    this.pieces = gameState.pieces;
    this.capturedPieces = gameState.capturedPieces;
    this.enPassant = gameState.enPassant;
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

  private isPiecePawn(piece: PieceItem) {
    return (
      piece.type === PieceType.PAWN_BLACK || piece.type === PieceType.PAWN_WHITE
    );
  }

  private canMovePawn = (piece: PieceItem, from: Coord, to: Coord) => {
    const currentPiece = this.findPieceByCoord(to);

    if (
      piece.type === PieceType.PAWN_BLACK &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] + 1 &&
          p.location[1] === from[1] + 1 &&
          currentPiece?.colour === PieceColour.WHITE
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_BLACK &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] + 1 &&
          p.location[1] === from[1] - 1 &&
          currentPiece?.colour === PieceColour.WHITE
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_BLACK &&
      this.getPieces().some(
        (p) =>
          this.enPassant &&
          p.location[1] === this.enPassant[1] &&
          p.location[0] === this.enPassant[0] &&
          to[0] === this.enPassant[0] + 1 &&
          to[1] === this.enPassant[1] &&
          from[0] === this.enPassant[0] &&
          [from[1] - 1, from[1] + 1].includes(this.enPassant[1])
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_BLACK &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] + 1 &&
          p.location[1] === from[1]
      )
    ) {
      return false;
    }

    if (
      piece.type === PieceType.PAWN_WHITE &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] - 1 &&
          p.location[1] === from[1] + 1 &&
          currentPiece?.colour === PieceColour.BLACK
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_WHITE &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] - 1 &&
          p.location[1] === from[1] - 1 &&
          currentPiece?.colour === PieceColour.BLACK
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_WHITE &&
      this.getPieces().some(
        (p) =>
          this.enPassant &&
          p.location[1] === this.enPassant[1] &&
          p.location[0] === this.enPassant[0] &&
          to[0] === this.enPassant[0] - 1 &&
          to[1] === this.enPassant[1] &&
          from[0] === this.enPassant[0] &&
          [from[1] - 1, from[1] + 1].includes(this.enPassant[1])
      )
    ) {
      return true;
    }

    if (
      piece.type === PieceType.PAWN_WHITE &&
      this.getPieces().some(
        (p) =>
          p.location[0] === to[0] &&
          p.location[1] === to[1] &&
          p.location[0] === from[0] - 1 &&
          p.location[1] === from[1]
      )
    ) {
      return false;
    }

    return piece.canMovePiece(from, to);
  };

  private canMovePieceNotPawn = (piece: PieceItem, from: Coord, to: Coord) => {
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

  public canMovePiece = (piece: PieceItem, to: Coord) => {
    const from = piece.location;
    const currentPiece = this.findPieceByCoord(to);

    if (
      !from ||
      !piece.canMovePiece ||
      piece.colour === currentPiece?.colour ||
      currentPiece?.type === PieceType.KING
    ) {
      return false;
    }

    return this.isPiecePawn(piece)
      ? this.canMovePawn(piece, from, to)
      : this.canMovePieceNotPawn(piece, from, to);
  };

  public getEnPassant = (
    draggedPiece: PieceItem,
    destination: Destination
  ): Coord | null => {
    if (
      draggedPiece.type === PieceType.PAWN_WHITE &&
      draggedPiece.location[0] === 6 &&
      destination.row === 4
    ) {
      return [destination.row, destination.col];
    } else if (
      draggedPiece.type === PieceType.PAWN_BLACK &&
      draggedPiece.location[0] === 1 &&
      destination.row === 3
    ) {
      return [destination.row, destination.col];
    } else {
      return null;
    }
  };

  public movePiece(piece: PieceItem, toX: number, toY: number) {
    const updatedPieces: PieceRecord[] = this.pieces.map((p) => {
      if (p.id === piece.id) {
        return { ...piece, location: [toX, toY] };
      }

      return p;
    });

    this.pieces = updatedPieces;

    this.emitChange();

    return { updatedPieces };
  }

  public isEqualCoord(c1: Coord | undefined, c2: Coord | undefined): boolean {
    if (!c1 || !c2) {
      return false;
    }

    return c1[0] === c2[0] && c1[1] === c2[1];
  }
}
