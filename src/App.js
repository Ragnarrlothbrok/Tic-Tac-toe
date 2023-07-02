import React, { useState, useEffect } from "react";
import "./styles.css";

const getInitial = () =>
  Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, (i) => {
      return { id: Date.now(), state: null };
    })
  );

export default function App() {
  const [current, setCurrent] = useState(getInitial);
  const [move, setMove] = useState(false);
  const [winner, setWinner] = useState("");
  const [freeze, setFreeze] = useState(false);

  const onClick = (x, y) => {
    if (freeze) return null;
    if (current[x][y]?.state !== null) return null;
    const latest = current;
    latest[x][y] = { ...latest[x][y], state: move ? "X" : "O" };
    setMove((move) => !move);
    setCurrent([...latest]);
  };

  const checkIfMatch = () => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (
          current[i][j].state !== current[i][j + 1].state ||
          current[i][j].state === null
        )
          break;
        if (j === 1) {
          setWinner(`${current[i][j].state}`);
          setFreeze(true);
        }
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (
          current[i][j].state !== current[i + 1][j].state ||
          current[i][j].state === null
        )
          break;
        if (i === 1) {
          setWinner(`${current[i][j].state}`);
          setFreeze(true);
        }
      }
    }
    // for (let i = 0; i < 1; i++) {
    //   for (let j = 0; j < 2; j++) {
    //     if (
    //       current[j][j].state !== current[j + 1][j + 1].state ||
    //       current[j][j].state === null
    //     )
    //       break;
    //     if (j === 1) {
    //       setWinner(`${current[i][j].state}`);
    //       setFreeze(true);
    //     }
    //   }
    //   for (let j = 2; j >0; j--) {
    //     if (
    //       current[j][j].state !== current[j - 1][j - 1].state ||
    //       current[j][j].state === null
    //     )
    //       break;
    //     if (j === 1) {
    //       setWinner(`${current[i][j].state}`);
    //       setFreeze(true);
    //     }
    //   }
    // }
  };

  useEffect(() => checkIfMatch(), [current, move]);

  const onReset = () => {
    const new1 = getInitial();
    setCurrent(new1);
    setFreeze(false);
  };

  return (
    <div className="App">
      <div className="board">
        {current.map((row, x) =>
          row.map((box, y) => (
            <div key={x + y} onClick={() => onClick(x, y)} className="box">
              {box.state && box.state}
            </div>
          ))
        )}
      </div>
      <button onClick={onReset}>Reset</button>
      <div>Winner found: {winner}</div>
    </div>
  );
}
