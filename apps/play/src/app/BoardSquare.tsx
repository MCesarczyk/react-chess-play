import { useDroppable } from '@dnd-kit/core';
import { Square } from './Square';
import { Game } from './Game';
import { PieceType } from './piece/types';
import { findPieceMove } from './piece/availableMoves';

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

    const possibleMove = findPieceMove(pieceType);

    if (!from || !possibleMove) {
      return false;
    }

    return possibleMove(from, [row, col]);
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
