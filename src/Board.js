import React, {useEffect, useRef, useState} from "react";
import {GRID_SIZE, NPC, NPC_GRID, USER, USER_GRID} from "./Game";
import NonBombableGrid from "./NonBombableGrid";
import BombableGrid from "./BombableGrid";

export const BOAT_LOCATION = '0';
export const EMPTY_LOCATION = '';
export const HIT = 'X';
export const MISS = '-';

export default function Board() {
    const [userGrid, setUserGrid] = useState(USER_GRID);  // NPC bombs this.
    const [NPCGrid, setNPCGrid] = useState(NPC_GRID);    // Human player bombs this.
    const [userTurn, setUserTurn] = useState(true);  // Human player turn or not.
    const bombableLocationsForNPCRef = useRef();  // Array or remaining bombable locations for NPC.

    useEffect(()=> {
        let arr = [];
        for(let i=0; i<(GRID_SIZE*GRID_SIZE); i++) {
            arr.push(i);
        }
        bombableLocationsForNPCRef.current = [...arr];
    },[]);

    const toggleTurn = () => {
        return setUserTurn(!userTurn);
    }

    const removeTargetFromBombableLocations = (value) => {
        for(let i = 0; i < bombableLocationsForNPCRef.current.length; i++){
            if(bombableLocationsForNPCRef.current[i] === value){
                bombableLocationsForNPCRef.current.splice(i, 1);
                break;
            }
        }
    }

    const changeUserGrid = (index, newStatus) => {
        let arr = [...userGrid];
        arr[index] = newStatus;
        setUserGrid(arr);
    }

    const NPCToBombLocation = (gridTarget) => {
        const locationStatus  = userGrid[gridTarget];

        if(locationStatus === EMPTY_LOCATION){
            removeTargetFromBombableLocations(gridTarget);
            changeUserGrid(gridTarget, MISS);
            toggleTurn();
        }else if(locationStatus === BOAT_LOCATION){
            removeTargetFromBombableLocations(gridTarget);
            changeUserGrid(gridTarget, HIT);
        }
    }

    // NPC-s turn to bomb !
    if (userTurn===false) {
        //  Random index from an array.
        const index = Math.floor(Math.random() * bombableLocationsForNPCRef.current.length);
        //  Value from that random index.
        const gridTarget = bombableLocationsForNPCRef.current[index];
        NPCToBombLocation(gridTarget);
    }

    return (
        <>
            <NonBombableGrid value={{ owner:USER, userTurn, toggleTurn,
                userGrid, setUserGrid }}
            />
            &nbsp;&nbsp;
            <BombableGrid value={{ owner:NPC,  userTurn, toggleTurn,
                NPCGrid, setNPCGrid}}
            />
        </>
    )
}