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

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    data: { row, col },
  });

  return (
    <Square
      ref={setNodeRef}
      isDark={isDark}
      isAllowed={
        !!pieceId &&
        !!pieceType &&
        game.canMovePiece(pieceId, findPieceMove(pieceType), [row, col])
      }
      isForbidden={isOver}
    >
      {children}
    </Square>
  );
};
