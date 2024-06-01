import { useEffect, useState } from 'react';
import { Game } from './Game';
import { PieceRecord, PieceType } from './types';
import { BoardSquare } from './BoardSquare';
import { King, Knight, Pawn } from './Piece';

interface BoardProps {
  game: Game;
}

export const Board = ({ game }: BoardProps) => {
  const [pieces, setPieces] = useState<PieceRecord[]>(game.pieces);

  useEffect(() => game.observe(setPieces), [game]);

  function renderSquare(row: number, col: number) {
    const isKnightHere = game.isEqualCoord(
      pieces.find((p) => p.type === PieceType.KNIGHT)?.location,
      [row, col]
    );
    const isPawnHere = game.isEqualCoord(
      pieces.find((p) => p.type === PieceType.PAWN)?.location,
      [row, col]
    );
    const isKingHere = game.isEqualCoord(
      pieces.find((p) => p.type === PieceType.KING)?.location,
      [row, col]
    );

    return (
      <BoardSquare key={`${row}-${col}`} row={row} col={col} game={game}>
        {isKnightHere && <Knight />}
        {isPawnHere && <Pawn />}
        {isKingHere && <King />}
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
