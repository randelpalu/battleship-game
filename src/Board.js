import React from "react";
import {NPC, NPC_GRID, USER, USER_GRID} from "./Game";
import Grid from "./Grid";

export default function Board() {
    return (
        <>
            <Grid value={{ owner:NPC, initialArray:NPC_GRID}}/>
            &nbsp;&nbsp;
            <Grid value={{ owner:USER, initialArray:USER_GRID}}/>
        </>
    )
}