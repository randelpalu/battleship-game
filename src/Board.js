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

    const removeFromBombableLocations = (index) => {
        bombableLocationsForNPCRef.current.splice(index, 1);
    }

    const changeUserGrid = (targetIndex, newStatus) => {
        let arr = [...userGrid];
        arr[targetIndex] = newStatus;
        setUserGrid(arr);
    }

    const NPCToBombLocation = (targetIndex) => {
        const locationStatus  = userGrid[targetIndex];

        if(locationStatus === EMPTY_LOCATION){
            removeFromBombableLocations(targetIndex);
            changeUserGrid(targetIndex, MISS);
            toggleTurn();
        }else if(locationStatus === BOAT_LOCATION){
            removeFromBombableLocations(targetIndex);
            changeUserGrid(targetIndex, HIT);
        }

    }

    // NPC-s turn to bomb !
    if (userTurn===false) {
        let targetIndex = Math.floor(Math.random() * bombableLocationsForNPCRef.current.length);
        NPCToBombLocation(targetIndex);
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