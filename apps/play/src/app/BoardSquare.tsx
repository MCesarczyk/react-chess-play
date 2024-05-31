import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { canMoveKnight, moveKnight } from '../Game';

interface BoardSquareProps {
  row: number;
  col: number;
  children: React.ReactNode;
}

export const BoardSquare = ({ row, col, children }: BoardSquareProps) => {
  const isDark = (row + col) % 2 === 1;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'knight',
      drop: () => moveKnight(row, col),
      canDrop: () => canMoveKnight(row, col),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [row, col]
  );

  return (
    <Square
      ref={drop}
      isDark={isDark}
      isAllowed={canDrop}
      isForbidden={isOver && !canDrop}
    >
      {children}
    </Square>
  );
};
