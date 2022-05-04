import { GameState } from '../src/types/EGameState';

export default function Connect4(props: IConnect4Props): JSX.Element;

export interface IConnect4Props {
  onPlayed?: (gameState: GameState) => void;
  iaDifficulty?: number;
}

export type Connect4Board = number[][];
