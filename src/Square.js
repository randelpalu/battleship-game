import React, {useContext, useState} from "react";
import {GridContext} from "./GridContext";
import {GameContext} from "./GameContext";
import {USER, NPC} from './Game';

const BOAT_LOCATION = '0';
const HIT = 'X';
const MISS = '-';

export default function Square(props) {
    const [state, setState] = useState(props.value.startingState);
    const grid = useContext(GridContext);
    const game = useContext(GameContext);

    const onClick = () => {
        // Player bombing on correct grid.
        if ((grid.owner === USER & game.playerTurn) | (grid.owner === NPC & !game.playerTurn)){
            if(state === HIT || state === MISS){   // Location has been already bombed !
            }else if(state === BOAT_LOCATION) {
                setState(HIT);
            }else {
                setState(MISS);
                grid.toggleTurn();
            }
        }
    }

    return (
        // <button className="square" onClick={onClick}>{props.value.id}</button>
        <button className="square" onClick={onClick}>{state}</button>
    )
}