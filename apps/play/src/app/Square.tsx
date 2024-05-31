import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

interface SquareProps {
  isDark: boolean;
  isAllowed: boolean;
  isForbidden: boolean;
  children: React.ReactNode;
}

export const Square = forwardRef(
  (props: SquareProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { isDark, isAllowed, isForbidden, children } = props;

    const baseStyle = 'w-full h-full grid place-items-center bg-white';

    const [className, setClassName] = useState(baseStyle);

    useEffect(() => {
      switch (true) {
        case isAllowed:
          setClassName('w-full h-full grid place-items-center bg-yellow-300');
          break;
        case isForbidden:
          setClassName('w-full h-full grid place-items-center bg-red-300');
          break;
        case isDark:
          setClassName('w-full h-full grid place-items-center bg-gray-700');
          break;
        default:
          setClassName(baseStyle);
      }
    }, [baseStyle, isAllowed, isDark, isForbidden]);

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);
