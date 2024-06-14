import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Game } from '../Game';
import { Destination, GameState } from '../types';
import { PieceColour, PieceItem, PieceType } from '../piece/types';

export const useDragEvents = (game: Game, gameState: GameState, draggedPiece: PieceItem | null, setDraggedPiece: (piece: PieceItem | null) => void, activeColour: PieceColour, setActiveColour: (colour: PieceColour) => void) => {
  function handleDragStart(event: DragStartEvent) {
    const currentEvent = event.active.data.current;
    currentEvent?.piece?.colour === activeColour &&
      setDraggedPiece(currentEvent.piece);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    const destination = over?.data.current as Destination | undefined;

    if (!draggedPiece || !destination) {
      return;
    }

    if (
      draggedPiece.location[0] === destination.row &&
      draggedPiece.location[1] === destination.col
    ) {
      setDraggedPiece(null);
      return;
    }

    if (!game.canMovePiece(draggedPiece, [destination.row, destination.col])) {
      setDraggedPiece(null);
      return;
    }

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

    setActiveColour(
      draggedPiece.colour === PieceColour.WHITE
        ? PieceColour.BLACK
        : PieceColour.WHITE
    );
    setDraggedPiece(null);
  }

  return { handleDragStart, handleDragEnd }
}
