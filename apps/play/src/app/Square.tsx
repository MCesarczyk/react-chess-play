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

    let bgColor = undefined;

    if (isAllowed) {
      bgColor = '#fffc5c';
    } else if (isForbidden) {
      bgColor = '#ff6459';
    } else {
      bgColor = isDark ? '#111' : '#fff';
    }

    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: bgColor,
        }}
      >
        {children}
      </div>
    );
  }
);
