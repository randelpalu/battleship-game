import {GRID_SIZE} from "./Game";
import {BOAT_LOCATION, EMPTY_LOCATION} from "./Board";

// Adjacent diagonals inside the grid !
export const getDiagonalLocations = (location) => {
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

// Adjacent non-diagonal neighbors inside the grid !
const getNonDiagonalNeighbors = (location) => {
    let neighbors = [];
    // Neighbor exists in N
    if(location - GRID_SIZE >= 0){
        neighbors.push(location - GRID_SIZE);
    }
    // Neighbor exists in S
    if(location + GRID_SIZE <= GRID_SIZE * GRID_SIZE){
        neighbors.push(location + GRID_SIZE);
    }
    // Neighbor exists in W
    if((location - 1) % GRID_SIZE !== GRID_SIZE - 1){
        neighbors.push(location - 1);
    }
    // Neighbor exists in E
    if((location + 1) % GRID_SIZE !== 0){
        neighbors.push(location + 1);
    }
    return neighbors;
}

export const createRandomGrid = (ships) => {
    // Incoming array is ok ?
    if(ships.length === 0 || !Array.isArray(ships)){
        return false;
    }

    // Initialize grid with all "empty locations"
    let grid = Array(100).fill(EMPTY_LOCATION);

    // Available locations to place a part of the ship
    let availableLocations = [];
    for(let i = 0; i < 100; i++) {
        availableLocations.push(i);
    }

    /* Place first part of the ship somewhere on the grid, and try to place rest of the ships parts
    * piece-by-piece to certain direction */
    function generateShipCoordinates(startingLocation, direction, shipLength) {
        let tmpArray = [startingLocation];
        let eastWestRow = null;  // Making sure ship stays on the same row.

        // shipLength is only 1 square !
        if(shipLength === 1) {
            return tmpArray;
        }

        switch (direction) {
            // North !
            case "north":
                for (let i = 1; i < shipLength; i++){
                    let prev = tmpArray[tmpArray.length - 1];
                    let curr = prev - GRID_SIZE;
                    if(curr < 0 || availableLocations.indexOf(curr) === -1){
                        return  false;
                    } else {
                        tmpArray.push(curr);
                    }
                }
                return tmpArray;
            // South !
            case "south":
                for (let i = 1; i < shipLength; i++){
                    let prev = tmpArray[tmpArray.length - 1];
                    let curr = prev + GRID_SIZE;
                    if(curr > 99 || availableLocations.indexOf(curr) === -1){
                        return  false;
                    } else {
                        tmpArray.push(curr);
                    }
                }
                return tmpArray;
            // West !
            case "west":
                eastWestRow = Math.floor(startingLocation / GRID_SIZE);
                for (let i = 1; i < shipLength; i++){
                    let prev = tmpArray[tmpArray.length - 1];
                    let curr = prev - 1;
                    let currRow = Math.floor(curr / GRID_SIZE);
                    if(currRow !== eastWestRow  || availableLocations.indexOf(curr) === -1){
                        return  false;
                    } else {
                        tmpArray.push(curr);
                    }
                }
                return tmpArray;
            // East !
            case "east":
                eastWestRow = Math.floor(startingLocation / GRID_SIZE);
                for (let i = 1; i < shipLength; i++){
                    let prev = tmpArray[tmpArray.length - 1];
                    let curr = prev + 1;
                    let currRow = Math.floor(curr / GRID_SIZE);
                    if(currRow !== eastWestRow || availableLocations.indexOf(curr) === -1){
                        return  false;
                    } else {
                        tmpArray.push(curr);
                    }
                }
                return tmpArray;
            default:
                return false;
        }
    }

    /* Remove adjacent tiles from availableLocations[] */
    function removeAdjacentTiles(shipCoordinates) {
        let locations = [...shipCoordinates];
        for (let i = 0; i < shipCoordinates.length; i++){
            const diag = getDiagonalLocations(shipCoordinates[i]);
            const nonDiag = getNonDiagonalNeighbors(shipCoordinates[i]);
            locations = [...locations, ...diag, ...nonDiag];
        }
        let toRemove = [...new Set(locations)];

        for (let i = 0; i < toRemove.length; i++){
            let index = availableLocations.indexOf(toRemove[i]);
            availableLocations.splice(index, 1);
        }
    }

    // Loop through all the ships
    for (let i = 0; i < ships.length; i++){
        let shipIsPlaced = false;

        // Try to place the ship beginning at some random available location
        do {
            let locIndex = Math.floor(Math.random() * availableLocations.length);
            let startLoc = availableLocations[locIndex];

            let directions = ["north", "south", "west", "east"];

            // See if whole ship can be placed (in any direction), starting from that random location
            do {
                let randomIndex = Math.floor(Math.random() * directions.length);
                let randomDirection = directions[randomIndex];
                directions.splice(randomIndex, 1);
                let coordinates = generateShipCoordinates(startLoc, randomDirection, ships[i]);  //ships[i]=pikkus

                // Ship placement possible, and coordinates returned !
                if (coordinates){
                    for (let i = 0; i < coordinates.length; i++) {
                        // Place ship !
                        grid[coordinates[i]] = BOAT_LOCATION;

                        // console.log(availableLocations);
                        // Remove locations from available locations !
                        // let index = availableLocations.indexOf(coordinates[i]);
                        // let newAvLoc = [...availableLocations];
                        // newAvLoc.splice(index, 1);
                        // availableLocations = [...newAvLoc];
                    }
                    removeAdjacentTiles(coordinates);
                    shipIsPlaced = true;
                    break;
                }

            }while (directions.length > 0)

        }while (!shipIsPlaced)
    }

    return grid;
}