import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';

interface SquareProps {
  isDark: boolean;
  isAllowed: boolean;
  isForbidden: boolean;
  isCheck: boolean;
  children: React.ReactNode;
}

export const Square = forwardRef(
  (props: SquareProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { isDark, isAllowed, isForbidden, isCheck, children } = props;

    let bgColor = undefined;

    if (isAllowed) {
      bgColor = '#fffd6d';
    } else if (isForbidden) {
      bgColor = '#ff8b50';
    } else if (isCheck) {
      bgColor = '#ff4d4d';
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
