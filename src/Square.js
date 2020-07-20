import React, {useContext, useState} from "react";
import {BoardContext} from "./BoardContext";
import {GridContext} from "./GridContext";
import {USER, NPC} from './Game';

const BOAT_LOCATION = '0';
const EMPTY_LOCATION = '';
const HIT = 'X';
const MISS = '-';

export default function Square(props) {
    const [state] = useState(props.value.startingState);
    const grid = useContext(GridContext);
    const board = useContext(BoardContext);

    const onClick = () => {
        // Player bombing on correct grid.
        if ((grid.owner !== USER & board.userTurnRef.current) | (grid.owner !== NPC & !board.userTurnRef.current)){
            if(state === EMPTY_LOCATION){
                //setState(MISS);
                let newNPCGrid = [...props.value.NPCGrid];
                newNPCGrid[props.value.id] = MISS;
                props.value.setNPCGrid(newNPCGrid);
                board.toggleTurn();
            }else if(state === BOAT_LOCATION){
                //setState(HIT);
                console.log(props.value.NPCGrid);
                let newNPCGrid = [...props.value.NPCGrid];
                newNPCGrid[props.value.id] = HIT;
                props.value.setNPCGrid(newNPCGrid);
                console.log(newNPCGrid);
            }
        }
    }

    return (
        // <button className="square" onClick={onClick}>{props.value.id}</button>
        <button className="square" onClick={onClick}>{props.value.NPCGrid[props.value.id]}</button>
    )
}