import clsx from 'clsx';
import { Coord } from '../types';

interface SquareProps {
  row: number;
  col: number;
  isDark: boolean;
  // isOver: boolean;
  children: React.ReactNode;
  onSquareClick: (coord: Coord) => void;
}

export const Square = ({
  row,
  col,
  isDark,
  children,
  onSquareClick,
}: SquareProps) => {
  return (
    <div
      key={`${row}-${col}`}
      // ref={drop}
      className={clsx(
        'w-full h-full grid place-items-center',
        isDark ? 'bg-gray-700' : 'bg-white'
        // isOver && 'bg-yellow-300'
      )}
      onClick={() => onSquareClick([row, col])}
    >
      {children}
    </div>
  );
};
