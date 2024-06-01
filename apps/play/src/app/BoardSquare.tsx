import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { Game } from '../Game';
import { PieceType } from '../types';

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
      accept: PieceType.KNIGHT,
      drop: () => game.movePiece(PieceType.KNIGHT, row, col),
      canDrop: () => game.canMovePiece(PieceType.KNIGHT, row, col),
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
