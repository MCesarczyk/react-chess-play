import styled from '@emotion/styled';
import { PieceColour, PieceData } from '../piece/types';

interface CounterProps {
  capturedPieces: PieceData[];
  colour: PieceColour;
}

export const Counter = ({ capturedPieces, colour }: CounterProps) => {
  const currentPieces = capturedPieces.filter((p) => p.colour === colour);
  const currentTypes = currentPieces.map((p) => p.type);
  const distinctTypes = [...new Set(currentTypes)];

  const calculateTypeOccurencies = (type: string) => {
    return currentTypes.filter((t) => t === type).length;
  };

  return (
    <CounterWrapper>
      <h2>Captured pieces:</h2>
      <h3>{colour}</h3>
      <ul>
        {distinctTypes.map((type) => (
          <li key={type}>
            {type} - {calculateTypeOccurencies(type)}
          </li>
        ))}
      </ul>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
`;
