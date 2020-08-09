import React from "react";
import {GAME_STARTING} from "./Game";

export default function Finish(props) {
    const finishGame = () => {
        props.value.setGameState(GAME_STARTING);
    }

    return (
        <>
            <h1>Mängu võitis: {props.value.winner.current} </h1>
            <br/>
            <button onClick={finishGame}>Back to start</button>
        </>
    )
}