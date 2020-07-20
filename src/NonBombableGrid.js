import React, {useContext} from "react";
import {GRID_SIZE} from "./Game";
import {GridContext} from "./GridContext";
import {BoardContext} from "./BoardContext";

export default function NonBombableGrid(props) {
    const board = useContext(BoardContext);
    let col = 0;

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            rows.push(<button className="square" key={i}>{props.value.userGrid[i]}</button>);
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
                <button onClick={()=> board.toggleTurn()}>Tere</button>
            </div>
        );
    }

    return (
        <GridContext.Provider value={{owner: props.value.owner}}>
            {DrawGrid()}
        </GridContext.Provider>
    )
}