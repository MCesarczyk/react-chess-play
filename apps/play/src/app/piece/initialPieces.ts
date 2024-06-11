import { PieceRecord } from "./types";
import { PieceColour, PieceType } from "./types";
import kingBlack from './assets/king_b.png';
import queenBlack from './assets/queen_b.png';
import rookBlack from './assets/rook_b.png';
import bishopBlack from './assets/bishop_b.png';
import knightBlack from './assets/knight_b.png';
import pawnBlack from './assets/pawn_b.png';
import kingWhite from './assets/king_w.png';
import queenWhite from './assets/queen_w.png';
import rookWhite from './assets/rook_w.png';
import bishopWhite from './assets/bishop_w.png';
import knightWhite from './assets/knight_w.png';
import pawnWhite from './assets/pawn_w.png';

export const initialPieces: PieceRecord[] = [
  {
    id: 'rook-black-right',
    type: PieceType.ROOK,
    colour: PieceColour.BLACK,
    image: rookBlack,
    alt: 'Rook black right',
    icon: '♜',
    location: [0, 0],
  },
  {
    id: 'bishop-black-right',
    type: PieceType.BISHOP,
    colour: PieceColour.BLACK,
    image: bishopBlack,
    alt: 'Bishop black right',
    icon: '♝',
    location: [0, 1],
  },
  {
    id: 'knight-black-right',
    type: PieceType.KNIGHT,
    colour: PieceColour.BLACK,
    image: knightBlack,
    alt: 'Knight black right',
    icon: '♞',
    location: [0, 2],
  },
  {
    id: 'queen-black',
    type: PieceType.QUEEN,
    colour: PieceColour.BLACK,
    image: queenBlack,
    alt: 'Queen black',
    icon: '♛',
    location: [0, 3],
  },
  {
    id: 'king-black',
    type: PieceType.KING,
    colour: PieceColour.BLACK,
    image: kingBlack,
    alt: 'King black',
    icon: '♚',
    location: [0, 4],
  },
  {
    id: 'knight-black-left',
    type: PieceType.KNIGHT,
    colour: PieceColour.BLACK,
    image: knightBlack,
    alt: 'Knight black left',
    icon: '♞',
    location: [0, 5],
  },
  {
    id: 'bishop-black-left',
    type: PieceType.BISHOP,
    colour: PieceColour.BLACK,
    image: bishopBlack,
    alt: 'Bishop black left',
    icon: '♝',
    location: [0, 6],
  },
  {
    id: 'rook-black-left',
    type: PieceType.ROOK,
    colour: PieceColour.BLACK,
    image: rookBlack,
    alt: 'Rook black left',
    icon: '♜',
    location: [0, 7],
  },
  ...Object.values(
    Array.from({ length: 8 }).map(
      (_, i) =>
      ({
        id: `pawn-black-${i + 1}`,
        type: PieceType.PAWN_BLACK,
        colour: PieceColour.BLACK,
        image: pawnBlack,
        alt: 'Pawn black',
        icon: '♟',
        location: [1, i],
      } as PieceRecord)
    )
  ),
  {
    id: 'rook-white-left',
    type: PieceType.ROOK,
    colour: PieceColour.WHITE,
    image: rookWhite,
    alt: 'Rook white left',
    icon: '♖',
    location: [7, 0],
  },
  {
    id: 'bishop-white-left',
    type: PieceType.BISHOP,
    colour: PieceColour.WHITE,
    image: bishopWhite,
    alt: 'Bishop white left',
    icon: '♗',
    location: [7, 1],
  },
  {
    id: 'knight-white-left',
    type: PieceType.KNIGHT,
    colour: PieceColour.WHITE,
    image: knightWhite,
    alt: 'Knight white left',
    icon: '♘',
    location: [7, 2],
  },
  {
    id: 'queen-white',
    type: PieceType.QUEEN,
    colour: PieceColour.WHITE,
    image: queenWhite,
    alt: 'Queen white',
    icon: '♕',
    location: [7, 3],
  },
  {
    id: 'king-white',
    type: PieceType.KING,
    colour: PieceColour.WHITE,
    image: kingWhite,
    alt: 'King white',
    icon: '♔',
    location: [7, 4],
  },
  {
    id: 'knight-white-right',
    type: PieceType.KNIGHT,
    colour: PieceColour.WHITE,
    image: knightWhite,
    alt: 'Knight white right',
    icon: '♘',
    location: [7, 5],
  },
  {
    id: 'bishop-white-right',
    type: PieceType.BISHOP,
    colour: PieceColour.WHITE,
    image: bishopWhite,
    alt: 'Bishop white right',
    icon: '♗',
    location: [7, 6],
  },
  {
    id: 'rook-white-right',
    type: PieceType.ROOK,
    colour: PieceColour.WHITE,
    image: rookWhite,
    alt: 'Rook white right',
    icon: '♖',
    location: [7, 7],
  },
  ...Object.values(
    Array.from({ length: 8 }).map(
      (_, i) =>
      ({
        id: `pawn-white-${8 - i}`,
        type: PieceType.PAWN_WHITE,
        colour: PieceColour.WHITE,
        image: pawnWhite,
        alt: 'Pawn white',
        icon: '♙',
        location: [6, 7 - i],
      } as PieceRecord)
    )
  ),
];
