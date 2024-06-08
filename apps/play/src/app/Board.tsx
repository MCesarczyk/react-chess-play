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
import { PieceItem, PieceRecord } from './piece/types';
import { findPieceMove } from './piece/availableMoves';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const [pieces, setPieces] = useState<PieceRecord[]>(game.getPieces());
  const [draggedPiece, setDraggedPiece] = useState<PieceItem | null>(null);
  const [beatedPieces, setBeatedPieces] = useState<PieceRecord[]>([]);

  useEffect(() => {
    console.log(beatedPieces);
  }, [beatedPieces]);

  useEffect(() => game.observe(setPieces), [game, draggedPiece]);

  function renderSquare(row: number, col: number) {
    const currentPiece = pieces.find((p) =>
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

    const destination = over?.data.current;

    if (!draggedPiece) {
      return;
    }

    if (
      destination &&
      game.canMovePiece(draggedPiece, [destination.row, destination.col])
    ) {
      const currentPiece = game.findPieceByCoord([
        destination.row,
        destination.col,
      ]);

      if (currentPiece?.colour === draggedPiece.colour) {
        return;
      }

      const { updatedPieces } = game.movePiece(
        draggedPiece.id,
        destination.row,
        destination.col
      );

      if (currentPiece) {
        game.setPieces([
          ...updatedPieces.filter((p) => p.id !== currentPiece.id),
        ]);
        setBeatedPieces([...beatedPieces, currentPiece]);
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
