import { useDroppable } from '@dnd-kit/core';
import { Square } from './Square';
import { Game } from './Game';
import { PieceItem } from './piece/types';

interface BoardSquareProps {
  row: number;
  col: number;
  children: React.ReactNode;
  game: Game;
  piece: PieceItem | undefined;
}

export const BoardSquare = ({
  row,
  col,
  children,
  game,
  piece,
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
      isAllowed={!!piece && game.canMovePiece(piece, [row, col])}
      isForbidden={isOver}
    >
      {children}
    </Square>
  );
};
