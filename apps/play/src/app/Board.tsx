import { useEffect, useState } from 'react';
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
import { Coord, PieceData, PieceRecord, PieceType } from './types';
import { BoardSquare } from './BoardSquare';
import { BoardPiece, findPiece } from './BoardPiece';
import { Piece } from './Piece';

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

    console.log('dragend', event);

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
          width: '100%',
          maxWidth: '100svh',
          margin: 'auto',
          aspectRatio: '1 / 1',
          border: '4px solid #333',
        }}
      >
        {squares}
      </div>

      <DragOverlay>
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
