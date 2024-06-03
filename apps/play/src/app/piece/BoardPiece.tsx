import { PieceColour, PieceData, PieceType } from './types';
import { Piece } from './Piece';
import { availablePieces } from './pieces';

export const findPiece = (type: PieceType): PieceData => availablePieces[type];

interface BoardPieceProps {
  type: PieceType;
  colour: PieceColour;
  id: string;
}

export const BoardPiece = ({ type, colour, id }: BoardPieceProps) => {
  return (
    <Piece
      type={type}
      colour={colour}
      id={id}
      image={availablePieces[type].image}
      alt={availablePieces[type].alt}
      canMovePiece={availablePieces[type].canMovePiece}
    />
  );
};
