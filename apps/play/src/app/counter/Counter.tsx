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

  const getIconByType = (type: string) => {
    return currentPieces.find((p) => p.type === type)?.icon;
  };

  return (
    <CounterWrapper>
      <Header>{colour.toUpperCase()}</Header>
      <PiecesList>
        {distinctTypes.map((type) => (
          <li key={type}>
            {getIconByType(type)} - {calculateTypeOccurencies(type)}
          </li>
        ))}
      </PiecesList>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
  gap: calc(0.5rem + 1vw);
  align-items: center;
  justify-content: center;
  padding: calc(0.5rem + 1vw);
  font-size: calc(0.5rem + 1vw);
  background-color: #acc2ac;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    font-size: 1.5rem;
  }

  @media (orientation: landscape) {
    flex-direction: column;
  }
`;

const Header = styled.h2`
  flex-grow: 1;
  text-align: center;
`;

const PiecesList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    font-size: 1.5rem;
  }

  @media (orientation: landscape) {
    flex-direction: column;
  }
`;
