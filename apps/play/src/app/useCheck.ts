import { useEffect, useState } from "react";
import { PieceColour } from "./piece/types";
import { findPieceMove } from "./piece/availableMoves";
import { Game } from "./Game";
import { GameState } from "./types";


export const useCheck = (game: Game, gameState: GameState, squares: JSX.Element[]) => {
  const [check, setCheck] = useState<PieceColour | null>(null);

  const handleCheckPrediction = () => {
    setCheck(null);

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
          s.props.row === game.findOpponentKing(p.colour)?.location[0] &&
          s.props.col === game.findOpponentKing(p.colour)?.location[1] &&
          setCheck(game.findOpponentKing(p.colour)?.colour ?? null)
      )
    );
  };

  useEffect(() => {
    handleCheckPrediction();
  }, [gameState.pieces]); // eslint-disable-line react-hooks/exhaustive-deps

  return { check };
}
