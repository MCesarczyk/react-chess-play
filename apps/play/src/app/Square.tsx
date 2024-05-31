import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface SquareProps {
  isDark: boolean;
  isAllowed: boolean;
  isForbidden: boolean;
  children: React.ReactNode;
}

export const Square = forwardRef(
  (props: SquareProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { isDark, isAllowed, isForbidden, children } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          'w-full h-full grid place-items-center',
          isDark ? 'bg-gray-700' : 'bg-white',
          isAllowed && 'bg-yellow-300',
          isForbidden && 'bg-red-300'
        )}
      >
        {children}
      </div>
    );
  }
);
