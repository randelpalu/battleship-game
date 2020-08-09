import React from "react";

const BOAT_LOCATION = '0';
const EMPTY_LOCATION = '';
const HIT = 'X';
const MISS = '-';

export default function Square({id, NPCGrid, setNPCGrid, userTurn, toggleTurn}) {
    const location = NPCGrid[id];

    const setLocationStatus = (bombingResult) => {
        let newNPCGrid = [...NPCGrid];
        newNPCGrid[id] = bombingResult;
        setNPCGrid(newNPCGrid);
    }

    const onClick = () => {
        if (userTurn){
            if(location === EMPTY_LOCATION){
                setLocationStatus(MISS);
                toggleTurn();
            }else if(location === BOAT_LOCATION){
                setLocationStatus(HIT);
            }
        }
    }

    return (
        <button className="square" onClick={onClick}>{
            (location === HIT || location === MISS) ? location : ''
        }</button>
    )
}