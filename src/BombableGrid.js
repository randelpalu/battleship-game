import React from "react";
import {GRID_SIZE} from "./Game";
import Square from "./Square";

export default function BombableGrid(props) {
    let col = 0;

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            rows.push(<Square key={i}
                              value={{
                                  id: i,
                                  NPCGrid: props.value.NPCGrid,
                                  setNPCGrid: props.value.setNPCGrid,
                                  userTurn: props.value.userTurn,
                                  toggleTurn: props.value.toggleTurn
                              }}
                        />
            );
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
            </div>
        );
    }

    return (
        <>
            {DrawGrid()}
        </>
    )
}