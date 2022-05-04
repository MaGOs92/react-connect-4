import { useState, useRef, useEffect } from 'react';
import { GameState } from '../types/EGameState';
import { Player } from '../types/EPlayer';
import { checkWin, createBoard, playColumn } from '../utils/connect4.utils';
import { getNextMove } from '../utils/minmax.utils';

export function useConnect4(iaDifficulty: number) {
  const boardRef = useRef(createBoard());
  const [isHumanTurn, setIsHumanTurn] = useState(true);
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);

  useEffect(() => {
    if (!isHumanTurn && gameState === GameState.PLAYING) {
      const IAMove = getNextMove(boardRef.current, iaDifficulty) as number;
      boardRef.current = playColumn(IAMove, Player.IA, boardRef.current);
      setGameState(checkWin(boardRef.current));
      setIsHumanTurn(true);
    }
  }, [isHumanTurn, gameState, iaDifficulty]);

  function newGame() {
    boardRef.current = createBoard();
    setIsHumanTurn(true);
    setGameState(GameState.PLAYING);
  }

  function checkMoveLegal(column: number) {
    if (boardRef.current[column][5] === 0) {
      return true;
    }
  }

  function play(column: number) {
    if (gameState !== GameState.PLAYING) {
      newGame();
    } else if (isHumanTurn && checkMoveLegal(column)) {
      setIsHumanTurn(false);
      boardRef.current = playColumn(column, Player.HUMAN, boardRef.current);
      setGameState(checkWin(boardRef.current));
    }
  }

  return {
    newGame,
    play,
    isHumanTurn,
    gameState,
    board: boardRef.current,
  };
}
