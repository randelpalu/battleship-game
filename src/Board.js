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
    const bombableLocationsForNPCRef = useRef([]);  // Array or remaining bombable locations for NPC.
    const nextNPCTargetsRef = useRef([]);  // If NPC hits something, next time they try neighboring locations.

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
     * remove that locations diagonals from future NPC bombing targets array. */
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

    //  If something gets hit, neighbours get added as next targets.
    const addNewTargets = (location) => {
        let north = location - GRID_SIZE;
        let south = location + GRID_SIZE;
        let west = location - 1;
        let east = location + 1;

        // Add N, if it has not been bombed before and not out of bounds
        if(north >= 0 && bombableLocationsForNPCRef.current.includes(north)){
            nextNPCTargetsRef.current = [...nextNPCTargetsRef.current, north];
        }
        // Add S, if it has not been bombed before and not out of bounds
        if(south < (GRID_SIZE * GRID_SIZE) && bombableLocationsForNPCRef.current.includes(south)){
            nextNPCTargetsRef.current = [...nextNPCTargetsRef.current, south];
        }
        // Add W, if not bombed before and not out of bounds
        if((location % GRID_SIZE !== 0) && bombableLocationsForNPCRef.current.includes(west)){
            nextNPCTargetsRef.current = [...nextNPCTargetsRef.current, west];
        }
        // Add E, if not bombed before and not out of bounds
        if(((location + 1) % GRID_SIZE !== 0) && bombableLocationsForNPCRef.current.includes(east)){
            nextNPCTargetsRef.current = [...nextNPCTargetsRef.current, east];
        }
    }

    const NPCToBomb = (location) => {
        const locationStatus  = userGrid[location];

        if(locationStatus === EMPTY_LOCATION){
            removeFromBombableLocations(location, false);
            changeUserGridState(location, MISS);
            toggleTurn();
        }else if(locationStatus === BOAT_LOCATION){
            // If ship was hit, remove diagonal locations from potential targets.
            removeFromBombableLocations(location, true);
            changeUserGridState(location, HIT);
            addNewTargets(location);
        }
    }

    // NPC-s turn to bomb !
    if (!userTurn) {
        let location;
        // NPC has saved some targets from last successful bombing.
        if(nextNPCTargetsRef.current.length){
            location = nextNPCTargetsRef.current[nextNPCTargetsRef.current.length-1];
            nextNPCTargetsRef.current.splice(nextNPCTargetsRef.current.length-1, 1);
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
            <NonBombableGrid value={{ owner:USER, toggleTurn, userGrid, setUserGrid }}
            />
            &nbsp;&nbsp;
            <BombableGrid value={{ owner:NPC, userTurn, toggleTurn, NPCGrid, setNPCGrid}}
            />
        </>
    )
}