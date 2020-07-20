import React, {useContext} from "react";
import {GRID_SIZE} from "./Game";
import {BoardContext} from "./BoardContext";
import {GridContext} from "./GridContext";
import Square from "./Square";

export default function BombableGrid(props) {
    const board = useContext(BoardContext);
    let col = 0;

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            // rows.push(<button className="square" key={i}>{i}</button>);
            rows.push(<Square key={i}
                              value={{
                                  id: i,
                                  startingState: props.value.NPCGrid[i],
                                  NPCGrid: props.value.NPCGrid,
                                  setNPCGrid: props.value.setNPCGrid
                              }}/>);
        }
        col++;

        return (
            <div className="board-row">
                {rows}
            </div>
        );
    }

    const DrawGrid = () => {
        let rows = [];

        for (let i = 0; i < GRID_SIZE; i++) {
            rows.push(DrawRow());
        }

        return (
            <div className="game-board">
                {props.value.owner} ships
                {rows}
                <button onClick={()=> board.toggleTurn()}>NPC</button>
            </div>
        );
    }

    return (
        <GridContext.Provider value={{owner: props.value.owner }}>
            {DrawGrid()}
        </GridContext.Provider>
    )
}