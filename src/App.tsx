import { useState } from 'react';
import Block from './component/block';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
      [0, 4, 8], [2, 4, 6]              // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // return "X" or "O"
      }
    }
    return null;
  };

  const handleBlockClick = (index: number) => {
    if (state[index] !== null) return;

    const stateCopy = [...state];
    stateCopy[index] = currentTurn;

    const winner = checkWinner(stateCopy);
    if (winner) {
      alert(`Winner is ${winner}`);
      return;
    }

    setState(stateCopy);
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div className="row" key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Block
                key={index}
                value={state[index]}
                onClick={() => handleBlockClick(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
