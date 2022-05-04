import React from 'react';
import { Player } from '../../types/EPlayer';
import styles from './token.module.scss';

interface IProps {
  player: Player;
  isPreview?: boolean;
}

export function Token({ player, isPreview }: IProps) {
  const mainColor = player === Player.HUMAN ? styles.red : styles.yellow;
  const innerColor =
    player === Player.HUMAN ? styles.innerRed : styles.innerYellow;

  return (
    <div
      className={`${styles.token} ${mainColor} ${
        isPreview && styles.previewToken
      }`}
    >
      <div className={`${styles.inner} ${innerColor}`} />
    </div>
  );
}
