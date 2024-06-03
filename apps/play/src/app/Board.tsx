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
import { Coord, PieceRecord } from './types';
import { BoardSquare } from './BoardSquare';
import { BoardPiece, findPiece } from './piece/BoardPiece';
import { Piece } from './piece/Piece';
import { PieceData, PieceType } from './piece/types';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const [pieces, setPieces] = useState<PieceRecord[]>(game.pieces);
  const [draggedPiece, setDraggedPiece] = useState<PieceData | null>(null);

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
        pieceType={draggedPiece?.type}
      >
        {currentPiece && <BoardPiece type={currentPiece.type} />}
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

  const canMovePiece = (pieceType: PieceType, destination: Coord) => {
    const from = game.locatePiece(pieceType);

    const piece = findPiece(pieceType);

    if (!from || !piece.canMovePiece) {
      return false;
    }

    return piece.canMovePiece(from, destination);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    const destination = over?.data.current;

    draggedPiece &&
      destination &&
      canMovePiece(draggedPiece.type, [destination.row, destination.col]) &&
      game.movePiece(draggedPiece.type, destination.row, destination.col);
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
          <Piece
            type={draggedPiece.type}
            alt={draggedPiece.alt}
            image={draggedPiece.image}
            canMovePiece={() => false}
          />
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
