import React, {useState, useRef} from 'react';
import Board from "./Board";
import Start from "./Start";
import Finish from "./Finish";

export const USER = "Player1";
export const NPC = "NPC";
export const GRID_SIZE = 10;
export const GAME_STARTING = 'starting';
export const GAME_PLAYING = 'playing';
export const GAME_FINISHED = 'finished';

export default function Game() {
  const [gameState, setGameState] = useState('starting');
  const winner = useRef();

  return (
    <>
      <div className="game">
        {(gameState === GAME_STARTING) &&
          <Start
              value={{gameState, setGameState}}
          />}
        {(gameState === GAME_PLAYING) &&
          <Board
              value={{gameState, setGameState, winner}}
          />}
        {(gameState === GAME_FINISHED) &&
          <Finish
              value={{gameState, setGameState, winner}}
          />}
      </div>
    </>
  );
}
