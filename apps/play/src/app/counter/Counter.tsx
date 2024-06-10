import styled from '@emotion/styled';
import { PieceColour, PieceData } from '../piece/types';

interface CounterProps {
  capturedPieces: PieceData[];
  colour: PieceColour;
}

export const Counter = ({ capturedPieces, colour }: CounterProps) => {
  const currentPieces = capturedPieces.filter((p) => p.colour === colour);

  return (
    <CounterWrapper>
      <div>Captured pieces:</div>
      <pre>{JSON.stringify(currentPieces, null, 2)}</pre>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
