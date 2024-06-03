import { Coord, PieceRecord } from './types';
import { PieceType } from './piece/types';

type Observer = ((pieces: PieceRecord[]) => void) | null;

export class Game {
  public pieces: PieceRecord[] = [
    {
      id: 'rook-black-right',
      type: PieceType.ROOK,
      colour: 'black',
      location: [0, 0],
    },
    {
      id: 'bishop-black-right',
      type: PieceType.BISHOP,
      colour: 'black',
      location: [0, 1],
    },
    {
      id: 'knight-black-right',
      type: PieceType.KNIGHT,
      colour: 'black',
      location: [0, 2],
    },
    {
      id: 'queen-black',
      type: PieceType.QUEEN,
      colour: 'black',
      location: [0, 3],
    },
    {
      id: 'king-black',
      type: PieceType.KING,
      colour: 'black',
      location: [0, 4],
    },
    {
      id: 'knight-black-left',
      type: PieceType.KNIGHT,
      colour: 'black',
      location: [0, 5],
    },
    {
      id: 'bishop-black-left',
      type: PieceType.BISHOP,
      colour: 'black',
      location: [0, 6],
    },
    {
      id: 'rook-black-left',
      type: PieceType.ROOK,
      colour: 'black',
      location: [0, 7],
    },
    ...Object.values(
      Array.from({ length: 8 }).map(
        (_, i) =>
          ({
            id: `pawn-black-${i + 1}`,
            type: PieceType.PAWN_BLACK,
            colour: 'black',
            location: [1, i],
          } as PieceRecord)
      )
    ),
    {
      id: 'pawn-white-8',
      type: PieceType.PAWN_WHITE,
      colour: 'black',
      location: [6, 0],
    },
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
