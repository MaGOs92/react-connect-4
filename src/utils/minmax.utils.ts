import { Connect4Board } from '../../typings/react-connect-4';
import { GameState } from '../types/EGameState';
import { Player } from '../types/EPlayer';
import { isMoveLegal, playColumn, checkWin } from './connect4.utils';

export function getNextMove(board: Connect4Board, depth: number) {
  let moveToPlay = 0;
  let bestMax = -Infinity;
  board.forEach((col, index: number) => {
    if (isMoveLegal(index, board)) {
      const newBoard = playColumn(index, Player.IA, board);
      let curMax = min(newBoard, depth);
      if (curMax > bestMax) {
        bestMax = curMax;
        moveToPlay = index;
      }
    }
  });
  return moveToPlay;
}

function min(board: Connect4Board, depth: number) {
  const gameState = checkWin(board);
  if (gameState === GameState.HUMAN_WON) {
    return -depth;
  } else if (gameState === GameState.IA_WON) {
    return depth;
  } else if (gameState === GameState.TIE || depth <= 0) {
    return 0;
  }

  let bestMin = Infinity;
  for (let i = 0; i < 7; i++) {
    if (isMoveLegal(i, board)) {
      const newBoard = playColumn(i, Player.HUMAN, board);
      let curMin = max(newBoard, depth - 1);
      if (curMin < bestMin) bestMin = curMin;
    }
  }
  return bestMin;
}

function max(board: Connect4Board, depth: number) {
  const gameState = checkWin(board);
  if (gameState === GameState.HUMAN_WON) {
    return -depth;
  } else if (gameState === GameState.IA_WON) {
    return depth;
  } else if (gameState === GameState.TIE || depth <= 0) {
    return 0;
  }

  let bestMax = -Infinity;
  for (let i = 0; i < 7; i++) {
    if (isMoveLegal(i, board)) {
      const newBoard = playColumn(i, Player.IA, board);
      let curMax = min(newBoard, depth - 1);
      if (curMax > bestMax) bestMax = curMax;
    }
  }
  return bestMax;
}
