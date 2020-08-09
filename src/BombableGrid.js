import React from "react";
import {GRID_SIZE} from "./Game";
import Square from "./Square";

export default function BombableGrid({owner, NPCGrid, setNPCGrid, userTurn, toggleTurn}) {
    let col = 0;

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            rows.push(<Square key = {i}
                              id = {i}
                              NPCGrid ={NPCGrid}
                              setNPCGrid = {setNPCGrid}
                              userTurn = {userTurn}
                              toggleTurn = {toggleTurn}
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
            rows.push(
                <div key={i}>
                    { DrawRow() }
                </div>
            );
        }

        return (
            <div className="game-board">
                {owner} ships
                {rows}
            </div>
        );
    }

    return (
        <>
            { DrawGrid() }
        </>
    )
}