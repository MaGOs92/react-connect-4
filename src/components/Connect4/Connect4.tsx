import React, { useState } from 'react';
import { Token } from '../Token/Token';
import { useConnect4 } from '../../hooks/useConnect4';
import { IConnect4Props } from '../../../typings/react-connect-4';
import { GameState } from '../../types/EGameState';
import styles from './connect4.module.scss';

export function Connect4({ onPlayed, iaDifficulty = 4 }: IConnect4Props) {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const { play, gameState, board, isHumanTurn } = useConnect4(iaDifficulty);
  const columnIndices = [0, 1, 2, 3, 4, 5, 6];
  const rowIndices = [5, 4, 3, 2, 1, 0];

  const previewNextMove = (columnIndex: number, rowIndex: number) => {
    if (
      hoveredColumn !== columnIndex ||
      !isHumanTurn ||
      gameState !== GameState.PLAYING
    ) {
      return;
    }

    return (
      board[columnIndex][rowIndex] === 0 &&
      (rowIndex === 0 ||
        board[columnIndex][rowIndex - 1] === 1 ||
        board[columnIndex][rowIndex - 1] === 2)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <div className={styles.board}>
          {rowIndices.map((rowIndex) => {
            return (
              <div className={styles.row} key={`row-${rowIndex}`}>
                {columnIndices.map((columnIndex) => (
                  <div
                    key={`case-${columnIndex}${rowIndex}`}
                    className={styles.case}
                    onMouseEnter={() => setHoveredColumn(columnIndex)}
                    onMouseLeave={() => setHoveredColumn(null)}
                    onClick={() => {
                      play(columnIndex);
                      if (onPlayed) {
                        onPlayed(gameState);
                      }
                    }}
                  >
                    <div className={styles.innerCase}>
                      {board[columnIndex][rowIndex] !== 0 && (
                        <Token player={board[columnIndex][rowIndex]} />
                      )}
                      {previewNextMove(columnIndex, rowIndex) && (
                        <Token player={1} isPreview={true} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className={styles.boardBottom}>
          <div className={styles.foot}></div>
          <div className={styles.foot}></div>
        </div>
      </div>
    </div>
  );
}
