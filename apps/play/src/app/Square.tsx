import styled from '@emotion/styled';
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
      <SquareWrapper $bg={bgColor} ref={ref}>
        {children}
      </SquareWrapper>
    );
  }
);

const SquareWrapper = styled.div<{ $bg: string }>`
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  border: 1px solid #000;
  background-color: ${({ $bg }) => $bg};
`;
