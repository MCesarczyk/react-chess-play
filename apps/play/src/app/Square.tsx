import clsx from 'clsx';

interface SquareProps {
  row: number;
  col: number;
  isDark: boolean;
  // isOver: boolean;
  children: React.ReactNode;
}

export const Square = ({ row, col, isDark, children }: SquareProps) => {
  return (
    <div
      key={`${row}-${col}`}
      // ref={drop}
      className={clsx(
        'w-full h-full grid place-items-center',
        isDark ? 'bg-gray-700' : 'bg-white'
        // isOver && 'bg-yellow-300'
      )}
      // onClick={() => onSquareClick(squareCoord)}
    >
      {children}
    </div>
  );
};
