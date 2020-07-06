import React, { useState } from "react";
import Square from "./Square";
import "./Game.css";

function Game() {

  const getBlankGrid = () => (
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
  )

  const [grid, setGrid] = useState(getBlankGrid());

  const playerPieces = ["X", "O"];

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState("");

  const handleClick = (y, x) => {
    if (!grid[y][x]) {
      const temporaryGrid = grid;
      temporaryGrid[y][x] = playerPieces[currentPlayer];
      setGrid(temporaryGrid);
    }

    checkForWinner(y, x);

    setCurrentPlayer(currentPlayer ? 0 : 1);
  };

  const checkForWinner = (y, x) => {
    checkRowForWinner(y);
    checkColumnForWinner(x);
    checkDiagonalsForWinner();
  };

  const checkRowForWinner = (y) => {
    if (grid[y][0] && grid[y][0] === grid[y][1] && grid[y][0] === grid[y][2]) {
      console.log("IN HERE");
      setWinner(playerPieces[currentPlayer]);
    }
  };

  const checkColumnForWinner = (x) => {
    if (grid[0][x] && grid[0][x] === grid[1][x] && grid[0][x] === grid[2][x]) {
      setWinner(playerPieces[currentPlayer]);
    }
  };

  const checkDiagonalsForWinner = () => {
    if (
      (grid[0][0] && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) ||
      (grid[2][0] && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2])
    ) {
      setWinner(playerPieces[currentPlayer]);
    }
  };

  const resetGame = () => {
    setWinner("");
    setGrid(getBlankGrid())
  }

  return (
    <div className="game">
      {winner ? (
        <>
          <div>{winner} is the winner!!!</div>
          <button onClick={resetGame}>Play again?</button>
          </>
      ) : (
        <>
          Currently {playerPieces[currentPlayer]}'s turn!!'
          {grid.map((row, y) => (
            <div className="row">
              {row.map((square, x) => (
                <Square onClick={() => handleClick(y, x)} text={grid[y][x]} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Game;
