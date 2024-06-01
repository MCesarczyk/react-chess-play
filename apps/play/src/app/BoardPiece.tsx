import { PieceType } from './types';

import king from '../assets/king.png';
import pawn from '../assets/pawn.png';
import knight from '../assets/knight_b.png';
import { Piece } from './Piece';

const pieces = {
  [PieceType.KING]: { image: king, alt: 'King' },
  [PieceType.PAWN]: { image: pawn, alt: 'Pawn' },
  [PieceType.KNIGHT]: { image: knight, alt: 'Knight' },
};

interface BoardPieceProps {
  type: PieceType;
}

export const BoardPiece = ({ type }: BoardPieceProps) => {
  return (
    <Piece type={type} image={pieces[type].image} alt={pieces[type].alt} />
  );
};
