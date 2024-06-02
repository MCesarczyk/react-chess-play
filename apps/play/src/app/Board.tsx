import { useEffect, useState } from 'react';
import { Game } from './Game';
import { PieceRecord, PieceType } from './types';
import { BoardSquare } from './BoardSquare';
import { BoardPiece } from './BoardPiece';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const [pieces, setPieces] = useState<PieceRecord[]>(game.pieces);
  const [draggedPiece, setDraggedPiece] = useState<PieceType | null>(null);

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
        pieceType={draggedPiece}
      >
        {currentPiece && (
          <BoardPiece
            type={currentPiece.type}
            setDraggedPiece={(piece) => setDraggedPiece(piece)}
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

  return (
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
  );
};
