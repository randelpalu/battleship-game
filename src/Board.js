import React, {useEffect, useRef, useState} from "react";
import {GRID_SIZE, NPC, NPC_GRID, USER, USER_GRID} from "./Game";
import NonBombableGrid from "./NonBombableGrid";
import BombableGrid from "./BombableGrid";
import {BoardContext} from "./BoardContext";

export default function Board() {
    const [userGrid, setUserGrid] = useState(() => {  // NPC bombs this !
        return USER_GRID;
    });
    const [NPCGrid, setNPCGrid] = useState(() => {  // Human player bombs this !
        return NPC_GRID;
    });
    const userTurnRef = useRef(true);  // Human player turn or not.
    const bombableLocationsForNPCRef = useRef();  // Array or remaining bombable locations for NPC.

    useEffect(()=> {
        let arr = [];
        for(let i=0; i<(GRID_SIZE*GRID_SIZE); i++) {
            arr.push(i);
        }
        bombableLocationsForNPCRef.current = [...arr];
    },[]);

    const toggleTurn = () => {
        userTurnRef.current = !userTurnRef.current;
    }

    // NPC-s turn to bomb !
    if (userTurnRef.current===false) {
        let target = Math.floor(Math.random() * bombableLocationsForNPCRef.current.length);
        console.log(target);
    }

    return (
        <BoardContext.Provider value={{userTurnRef, toggleTurn}}>
            <NonBombableGrid value={{ owner:USER, userGrid, setUserGrid, bombableLocationsForNPCRef }}/>
            &nbsp;&nbsp;
            <BombableGrid value={{ owner:NPC, NPCGrid, setNPCGrid}}/>
        </BoardContext.Provider>
    )
}