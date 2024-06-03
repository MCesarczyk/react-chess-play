import { PieceData, PieceType } from './types';
import { Piece } from './Piece';
import { pieces } from './pieces';

export const findPiece = (type: PieceType): PieceData => pieces[type];

interface BoardPieceProps {
  type: PieceType;
}

export const BoardPiece = ({ type }: BoardPieceProps) => {
  return (
    <Piece
      type={type}
      image={pieces[type].image}
      alt={pieces[type].alt}
      canMovePiece={pieces[type].canMovePiece}
    />
  );
};
