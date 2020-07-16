import React, { useState } from 'react';
import {GameContext} from './GameContext';
import Board from "./Board";

export const USER = "Player1";
export const NPC = "NPC";
export const GRID_SIZE = 10;

export const USER_GRID = [
  "","","","0","","","0","0","","",
  "0","","","","","","","","","",
  "0","","","0","0","0","","","","",
  "0","","","","","","","","","",
  "0","","","","","","0","0","","",
  "","","","","0","","","","","",
  "","0","","","0","","","","","0",
  "","","","","0","","","","","",
  "","","","","","","","","","",
  "0","","","","","","","","0","0",
];
export const NPC_GRID = [
  "","","","","","","0","0","0","",
  "0","","","","","","","","","",
  "","","0","0","0","0","","","","",
  "","","","","","","","","","",
  "","","0","","","0" +
  "","","","","0",
  "","","0","","","","","","","",
  "","","","","","","","","","",
  "0","0","","","0","","","","","",
  "","","","","0","","","","","",
  "","","0","","0","","","0","0","",
];

export default function Game() {
  const [playerTurn, setPlayerTurn] = useState(true);

  function whosTurn() {
    return playerTurn === true ? USER : NPC;
  }

  return (
    <GameContext.Provider value={{playerTurn, setPlayerTurn}}>
      <h3>{ whosTurn() } turn</h3> 
      <div className="game">
        <Board />
      </div>
    </GameContext.Provider>
  );
}
