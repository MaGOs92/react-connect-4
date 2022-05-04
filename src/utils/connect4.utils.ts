import { Connect4Board } from '../../typings/react-connect-4';
import { GameState } from '../types/EGameState';
import { Player } from '../types/EPlayer';

export function createBoard(): Connect4Board {
  var board = new Array();
  for (var i = 0; i < 7; i++) {
    board[i] = new Array();
    for (var j = 0; j < 6; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

export function isMoveLegal(column: number, board: Connect4Board): boolean {
  if (board[column][5] === 0) {
    return true;
  }

  return false;
}

export function copyBoard(board: Connect4Board): Connect4Board {
  return board.reduce(
    (acc, cur, index) => {
      acc[index] = [...cur];

      return acc;
    },
    [...board]
  );
}

export function playColumn(
  column: number,
  player: Player,
  board: Connect4Board
): Connect4Board {
  const newBoard = copyBoard(board);
  let played = false;

  for (let i = 0; i < 6; i++) {
    if (newBoard[column][i] === 0 && !played) {
      newBoard[column][i] = player;
      played = true;
    }
  }

  return newBoard;
}

export function checkWin(board: Connect4Board): GameState {
  let tieGame = true;
  let result = 0;
  board.map((column, i) => {
    column.map((jeton, j) => {
      if (jeton === 0) {
        tieGame = false;
        return;
      }
      // Vérification gauche
      let countToWin = 1;
      let casesToVerify = 3;
      for (let k = i - 1; k >= 0; k--) {
        if (casesToVerify <= 0) {
          break;
        } else if (board[k][j] === jeton) {
          countToWin++;
        }
        casesToVerify--;
      }
      if (countToWin === 4) {
        return (result = jeton);
      }
      // Vérification droite
      countToWin = 1;
      casesToVerify = 3;
      for (let k = i + 1; k < board.length; k++) {
        if (casesToVerify <= 0) {
          break;
        } else if (board[k][j] === jeton) {
          countToWin++;
        }
        casesToVerify--;
      }
      if (countToWin === 4) {
        return (result = jeton);
      }
      // Vérification haut
      countToWin = 1;
      casesToVerify = 3;
      for (let k = j + 1; k <= column.length; k++) {
        if (casesToVerify <= 0) {
          break;
        } else if (board[i][k] === jeton) {
          countToWin++;
        }
        casesToVerify--;
      }
      if (countToWin === 4) {
        return (result = jeton);
      }
      // Vérification diagonale gauche
      countToWin = 1;
      casesToVerify = 3;
      let l = j + 1;
      for (let k = i - 1; k >= 0; k--) {
        if (casesToVerify <= 0 || l >= column.length) {
          break;
        }
        if (board[k][l] === jeton) {
          countToWin++;
        }
        casesToVerify--;
        l++;
      }
      if (countToWin === 4) {
        return (result = jeton);
      }
      // Vérification diagonale droite
      countToWin = 1;
      casesToVerify = 3;
      l = j + 1;
      for (let k = i + 1; k < board.length; k++) {
        if (casesToVerify <= 0 || l >= column.length) {
          break;
        } else if (board[k][l] === jeton) {
          countToWin++;
        }
        casesToVerify--;
        l++;
      }
      if (countToWin === 4) {
        return (result = jeton);
      }
    });
  });
  if (result === 1 || result === 2) {
    return result;
  } else if (tieGame) {
    return GameState.TIE;
  }

  return GameState.PLAYING;
}
