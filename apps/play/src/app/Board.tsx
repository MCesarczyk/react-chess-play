import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import styled from '@emotion/styled';

import { Game } from './Game';
import { Destination, GameState } from './types';
import { BoardSquare } from './BoardSquare';

import { PieceColour, PieceItem, PieceType } from './piece/types';
import { Piece } from './piece/Piece';
import { findPieceMove } from './piece/availableMoves';
import { useEffect, useState } from 'react';

interface BoardProps {
  game: Game;
  gameState: GameState;
  draggedPiece: PieceItem | null;
  setDraggedPiece: (piece: PieceItem | null) => void;
}

export const Board = ({
  game,
  gameState,
  draggedPiece,
  setDraggedPiece,
}: BoardProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const [check, setCheck] = useState(false);

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

  const handleCheckPrediction = () => {
    setCheck(false);

    gameState.pieces.forEach((p) =>
      squares.forEach(
        (s) =>
          game.canMovePiece(
            {
              ...p,
              canMovePiece: findPieceMove(p.type),
            },
            [s.props.row, s.props.col]
          ) &&
          s.props.row === game.opponentKingLocation(p.colour)?.location[0] &&
          s.props.col === game.opponentKingLocation(p.colour)?.location[1] &&
          setCheck(true)
      )
    );
  };

  useEffect(() => {
    handleCheckPrediction();
  }, [gameState.pieces]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDragStart(event: DragStartEvent) {
    const currentEvent = event.active.data.current;
    currentEvent && setDraggedPiece(currentEvent.piece);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    const destination = over?.data.current as Destination | undefined;

    if (!draggedPiece || !destination) {
      return;
    }

    if (game.canMovePiece(draggedPiece, [destination.row, destination.col])) {
      let interferringPiece = game.findPieceByCoord([
        destination.row,
        destination.col,
      ]);

      if (interferringPiece?.type === PieceType.KING) {
        setDraggedPiece(null);
        return;
      }

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

      if (interferringPiece && interferringPiece.type) {
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
      <BoardWrapper {...{ check }}>{squares}</BoardWrapper>

      <DragOverlay adjustScale={true}>
        {draggedPiece ? (
          <Piece piece={{ ...draggedPiece, id: 'dragged-piece' }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const BoardWrapper = styled.div<{ check?: boolean }>`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  max-width: 100svh;
  aspect-ratio: 1 / 1;
  border: ${({ check }) => `4px solid ${check ? '#dc143c' : '#333'}`};
`;
