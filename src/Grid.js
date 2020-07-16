import React, {useContext} from "react";
import {GameContext} from "./GameContext";
import {GRID_SIZE} from "./Game";
import {GridContext} from "./GridContext";
import Square from "./Square";

export default function Grid(props) {
    // const [playerGrid, setPlayerGrid] = useState([]);
    const game = useContext(GameContext);
    let col = 0;

    const toggleTurn = () => {
        game.setPlayerTurn(game.playerTurn = !game.playerTurn);
    }

    const DrawRow = ()  => {
        let rows = [];
        let accumulator = GRID_SIZE * col;

        for (let i = accumulator; i < (GRID_SIZE + accumulator); i++) {
            // rows.push(<button className="square" key={i}>{i}</button>);
            rows.push(<Square key={i} value={{id: i, startingState: props.value.initialArray[i]}}/>);
        }
        col++;

        return (
            <div className="board-row">
                {rows}
            </div>
        );
    }

    const DrawGrid = () => {
        let rows = [];

        for (let i = 0; i < GRID_SIZE; i++) {
            rows.push(DrawRow());
        }

        return (
            <div className="game-board">
                {props.value.owner} board
                {rows}
                <button onClick={()=> toggleTurn()}>Tere</button>
            </div>
        );
    }

    return (
        <GridContext.Provider value={{owner: props.value.owner, toggleTurn }}>
            {DrawGrid()}
        </GridContext.Provider>
    )
}