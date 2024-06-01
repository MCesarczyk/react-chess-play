import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { Game } from '../Game';

interface BoardSquareProps {
  row: number;
  col: number;
  children: React.ReactNode;
  game: Game;
}

export const BoardSquare = ({ row, col, children, game }: BoardSquareProps) => {
  const isDark = (row + col) % 2 === 1;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'knight',
      drop: () => game.moveKnight(row, col),
      canDrop: () => game.canMoveKnight(row, col),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game]
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
