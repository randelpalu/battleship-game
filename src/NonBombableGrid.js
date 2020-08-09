import React from "react";
import {GRID_SIZE} from "./Game";

export default function NonBombableGrid({owner, userGrid}) {
    let col = 0;

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            rows.push(<button className="square" key={i}>{userGrid[i]}</button>);
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
            rows.push(
                <div id={i}>
                    {DrawRow()}
                </div>
            );
        }

        return (
            <>
                {owner} ships
                {rows}
            </>
        );
    }

    return (
        <>
            <div className="game-board">
                {DrawGrid()}
            </div>
        </>
    )
}