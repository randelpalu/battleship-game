import React from "react";

const BOAT_LOCATION = '0';
const EMPTY_LOCATION = '';
const HIT = 'X';
const MISS = '-';

export default function Square(props) {
    const location = props.value.NPCGrid[props.value.id];

    const bombLocation = (bombingResult) => {
        let newNPCGrid = [...props.value.NPCGrid];
        newNPCGrid[props.value.id] = bombingResult;
        props.value.setNPCGrid(newNPCGrid);
    }

    const onClick = () => {
        if (props.value.userTurn){
            if(location === EMPTY_LOCATION){
                bombLocation(MISS);
                props.value.toggleTurn();
            }else if(location === BOAT_LOCATION){
                bombLocation(HIT);
            }
        }
    }

    return (
        <button className="square" onClick={onClick}>{location}</button>
    )
}