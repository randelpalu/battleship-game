import React from "react";
import {GAME_PLAYING} from "./Game";

export  default function Start(props) {
    const startGame = () => {
        props.value.setGameState(GAME_PLAYING);
    }

    return (
        <>
            <button onClick={startGame}>Generate new game</button>
        </>
    )
}