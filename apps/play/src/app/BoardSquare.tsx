import { useDroppable } from '@dnd-kit/core';
import { Square } from './Square';
import { Game } from './Game';
import { PieceType } from './types';
import { findPiece } from './BoardPiece';

interface BoardSquareProps {
  row: number;
  col: number;
  children: React.ReactNode;
  game: Game;
  pieceType: PieceType | undefined;
}

export const BoardSquare = ({
  row,
  col,
  children,
  game,
  pieceType,
}: BoardSquareProps) => {
  const isDark = (row + col) % 2 === 1;

  const canMovePiece = () => {
    if (!pieceType) {
      return false;
    }

    const from = game.locatePiece(pieceType);

    const piece = findPiece(pieceType);

    if (!from || !piece.canMovePiece) {
      return false;
    }

    const dx = row - from[0];
    const dy = col - from[1];

    if (pieceType === PieceType.KNIGHT) {
      return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      );
    } else if (pieceType === PieceType.PAWN) {
      const isFirstMove = from[1] === 2 || from[1] === 7;

      return Math.abs(dy) === 0 && dx === (isFirstMove ? -2 : -1);
    } else if (pieceType === PieceType.KING) {
      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && (dx !== 0 || dy !== 0);
    }

    return false;
    // return piece.canMovePiece(from, [row, col]);
  };

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    data: { row, col },
  });

  return (
    <Square
      ref={setNodeRef}
      isDark={isDark}
      isAllowed={canMovePiece()}
      isForbidden={isOver}
    >
      {children}
    </Square>
  );
};
