import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Game } from './Game';
import { PieceColour, PieceItem } from './piece/types';
import { GameState } from './types';
import { Board } from './Board';
import { Counter } from './counter/Counter';

interface PageProps {
  game: Game;
}

export const Page = ({ game }: PageProps) => {
  const [gameState, setGameState] = useState<GameState>(game.getGameState());
  const [draggedPiece, setDraggedPiece] = useState<PieceItem | null>(null);

  useEffect(() => game.observe(setGameState), [game, draggedPiece]);

  return (
    <BoardWrapper>
      <Counter
        capturedPieces={gameState.capturedPieces}
        colour={PieceColour.BLACK}
      />
      <Board
        game={game}
        gameState={gameState}
        draggedPiece={draggedPiece}
        setDraggedPiece={setDraggedPiece}
      />
      <Counter
        capturedPieces={gameState.capturedPieces}
        colour={PieceColour.WHITE}
      />
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
  background-color: #a3a7b0;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (orientation: landscape) {
    flex-direction: row;
  }
`;
