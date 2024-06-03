import { useDroppable } from '@dnd-kit/core';
import { Square } from './Square';
import { Game } from './Game';
import { PieceType } from './piece/types';
import { findPiece } from './piece/BoardPiece';

interface BoardSquareProps {
  row: number;
  col: number;
  children: React.ReactNode;
  game: Game;
  pieceType: PieceType | undefined;
  pieceId: string | undefined;
}

export const BoardSquare = ({
  row,
  col,
  children,
  game,
  pieceType,
  pieceId,
}: BoardSquareProps) => {
  const isDark = (row + col) % 2 === 1;

  const canMovePiece = () => {
    if (!pieceType || !pieceId) {
      return false;
    }

    const from = game.locatePiece(pieceId);

    const piece = findPiece(pieceType);

    if (!from || !piece.canMovePiece) {
      return false;
    }

    return piece.canMovePiece(from, [row, col]);
  };

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    data: { row, col },
  });

  return (
    <Square
      ref={setNodeRef}
      isDark={isDark}
      isAllowed={canMovePiece()}
      isForbidden={isOver}
    >
      {children}
    </Square>
  );
};
