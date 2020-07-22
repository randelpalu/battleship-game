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
    const nextNPCTargets = useRef([]);  // If NPC hits something, next time they try neighboring locations.

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

    const changeUserGridState = (index, newStatus) => {
        let arr = [...userGrid];
        arr[index] = newStatus;
        setUserGrid(arr);
    }

    const getDiagonalLocations = (location) => {
        let diagonals = [];
        // Diagonal exists in NW
        if(((location - GRID_SIZE) >= 0) && (location % GRID_SIZE !== 0)){
            diagonals.push(location - GRID_SIZE - 1);
        }
        // Diagonal exists in SW
        if(((location + 1 + GRID_SIZE) <= (GRID_SIZE * GRID_SIZE)) && (location % GRID_SIZE !== 0)){
            diagonals.push(location + GRID_SIZE - 1);
        }
        // Diagonal exists in NE
        if(((location - GRID_SIZE) >= 0) && ((location + 1) % GRID_SIZE !== 0)){
            diagonals.push(location - GRID_SIZE + 1);
        }
        // Diagonal exists in SE
        if(((location + 1 + GRID_SIZE) <= (GRID_SIZE * GRID_SIZE)) && ((location + 1) % GRID_SIZE !== 0)){
            diagonals.push(location + GRID_SIZE + 1);
        }
        return diagonals;
    }

    const removeDiagonals = (location) => {
        const validDiagonals = getDiagonalLocations(location);
        validDiagonals.forEach((diagonal) => {
            for(let i = 0; i < bombableLocationsForNPCRef.current.length; i++){
                if(bombableLocationsForNPCRef.current[i] === diagonal){
                    bombableLocationsForNPCRef.current.splice(i, 1);
                    break;
                }
            }
        })
    }

    /** Remove value from bombable locations array. If ship was hit, also
     * remove that locations diagonals from future NPC's bombings. */
    const removeFromBombableLocations = (location, shipWasHit=false) => {
        for(let i = 0; i < bombableLocationsForNPCRef.current.length; i++){
            if(bombableLocationsForNPCRef.current[i] === location){
                bombableLocationsForNPCRef.current.splice(i, 1);
                if(shipWasHit){
                    removeDiagonals(location);
                }
                break;
            }
        }
    }

    const NPCToBomb = (location) => {
        const locationStatus  = userGrid[location];

        if(locationStatus === EMPTY_LOCATION){
            removeFromBombableLocations(location, false);
            changeUserGridState(location, MISS);
            toggleTurn();
        }else if(locationStatus === BOAT_LOCATION){
            removeFromBombableLocations(location, true);
            changeUserGridState(location, HIT);
        }
    }

    // NPC-s turn to bomb !
    if (userTurn===false) {
        let location;

        // NPC has cached some targets from last successful bombing.
        if(nextNPCTargets.current.length){
            console.log(nextNPCTargets);
            location = nextNPCTargets.current.pop;
            console.log(nextNPCTargets);
        }else{
            //  Random index from an array of all possible bombing locations.
            const index = Math.floor(Math.random() * bombableLocationsForNPCRef.current.length);
            //  Value of that random index.
            location = bombableLocationsForNPCRef.current[index];
        }

        NPCToBomb(location);
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