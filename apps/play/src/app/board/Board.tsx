import styled from '@emotion/styled';
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import { Game } from '../Game';
import { GameState } from '../types';
import { BoardSquare } from './BoardSquare';
import { PieceColour, PieceItem, PieceType } from '../piece/types';
import { Piece } from '../piece/Piece';
import { findPieceMove } from '../piece/availableMoves';
import { useCheck } from './useCheck';
import { useDragEvents } from './useDragEvents';

interface BoardProps {
  game: Game;
  gameState: GameState;
  draggedPiece: PieceItem | null;
  setDraggedPiece: (piece: PieceItem | null) => void;
  activeColour: PieceColour;
  setActiveColour: (colour: PieceColour) => void;
}

export const Board = ({
  game,
  gameState,
  draggedPiece,
  setDraggedPiece,
  activeColour,
  setActiveColour,
}: BoardProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const squares: JSX.Element[] = [];

  const { check } = useCheck(game, gameState, squares);

  function renderSquare(row: number, col: number) {
    const currentPiece = gameState.pieces.find((p) =>
      game.isEqualCoord(p.location, [row, col])
    );

    return (
      <BoardSquare
        key={`${row}-${col}`}
        row={row}
        col={col}
        game={game}
        piece={draggedPiece || undefined}
        isCheck={
          !!check &&
          currentPiece?.type === PieceType.KING &&
          currentPiece.colour === check
        }
      >
        {currentPiece && (
          <Piece
            piece={{
              ...currentPiece,
              canMovePiece: findPieceMove(currentPiece.type),
            }}
            disabled={currentPiece.colour !== activeColour}
          />
        )}
      </BoardSquare>
    );
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
  }

  const { handleDragStart, handleDragEnd } = useDragEvents(
    game,
    gameState,
    draggedPiece,
    setDraggedPiece,
    activeColour,
    setActiveColour
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <BoardWrapper isCheck={!!check}>{squares}</BoardWrapper>

      <DragOverlay adjustScale={true}>
        {draggedPiece ? (
          <Piece piece={{ ...draggedPiece, id: 'dragged-piece' }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const BoardWrapper = styled.div<{ isCheck?: boolean }>`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  max-width: 100svh;
  aspect-ratio: 1 / 1;
  border: ${({ isCheck }) => `4px solid ${isCheck ? '#dc143c' : '#333'}`};
`;
