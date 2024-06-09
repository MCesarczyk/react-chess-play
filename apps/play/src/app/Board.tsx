import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { Game } from './Game';
import { BoardSquare } from './BoardSquare';
import { Piece } from './piece/Piece';
import { PieceColour, PieceItem, PieceType } from './piece/types';
import { findPieceMove } from './piece/availableMoves';
import { Destination, GameState } from './types';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const [gameState, setGameState] = useState<GameState>(game.getGameState());
  const [draggedPiece, setDraggedPiece] = useState<PieceItem | null>(null);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  useEffect(() => game.observe(setGameState), [game, draggedPiece]);

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
      >
        {currentPiece && (
          <Piece
            piece={{
              ...currentPiece,
              canMovePiece: findPieceMove(currentPiece.type),
            }}
          />
        )}
      </BoardSquare>
    );
  }

  const squares: JSX.Element[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const currentEvent = event.active.data.current;
    currentEvent && setDraggedPiece(currentEvent.piece);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    const destination = over?.data.current as Destination | undefined;

    if (!draggedPiece) {
      return;
    }

    if (
      destination &&
      game.canMovePiece(draggedPiece, [destination.row, destination.col])
    ) {
      let interferringPiece = game.findPieceByCoord([
        destination.row,
        destination.col,
      ]);

      if (draggedPiece.type === PieceType.PAWN_WHITE && gameState.enPassant) {
        const enPassantPiece = game.findPieceByCoord(gameState.enPassant);

        if (
          destination.col === gameState.enPassant[1] &&
          destination.row === gameState.enPassant[0] - 1 &&
          enPassantPiece?.colour === PieceColour.BLACK
        ) {
          interferringPiece = enPassantPiece;
        }
      }

      if (draggedPiece.type === PieceType.PAWN_BLACK && gameState.enPassant) {
        const enPassantPiece = game.findPieceByCoord(gameState.enPassant);

        if (
          destination.col === gameState.enPassant[1] &&
          destination.row === gameState.enPassant[0] + 1 &&
          enPassantPiece?.colour === PieceColour.WHITE
        ) {
          interferringPiece = enPassantPiece;
        }
      }

      const { updatedPieces } = game.movePiece(
        draggedPiece,
        destination.row,
        destination.col
      );

      if (interferringPiece) {
        const { location, ...capturedPiece } = interferringPiece;

        game.setGameState({
          pieces: updatedPieces.filter((p) => p.id !== interferringPiece.id),
          capturedPieces: [...gameState.capturedPieces, capturedPiece],
          enPassant: null,
        });
      } else {
        game.setGameState({
          pieces: updatedPieces,
          capturedPieces: gameState.capturedPieces,
          enPassant: game.getEnPassant(draggedPiece, destination),
        });
      }
    }
    setDraggedPiece(null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <BoardWrapper>{squares}</BoardWrapper>

      <DragOverlay adjustScale={true}>
        {draggedPiece ? (
          <Piece piece={{ ...draggedPiece, id: 'dragged-piece' }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  max-width: 100svh;
  margin: auto;
  aspect-ratio: 1 / 1;
  border: 4px solid #333;
`;
