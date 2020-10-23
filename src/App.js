import React, { useState } from 'react';
import './App.css';
import { MazeCanvas } from './features/canvas/canvas';
import { useDispatch, useSelector } from 'react-redux';
import { carveWall, newMaze, selectMaze, setCellColor } from './features/canvas/mazeSlice';
import { directions, dx, dy, opposite, turnRight, rightDir, leftDir, turnLeft } from './models/Wall';
import shuffle from './utils/shuffle';
import sleep from './utils/sleep';
import randInt from './utils/randInt';
import { SolverCanvas } from './features/solver/solver';
import { addMove, clearMoves, setStartEnd } from './features/solver/solverSlice';


async function recursiveIteration(x, y, maze, dispatch) {
  const dirs = ["N", "S", "E", "W"];
  shuffle(dirs); //W
  await dispatch(setCellColor({
    x,
    y,
    color: "rgba(78, 5, 121, 0.7)"
  }));
  // xy 00, shuffle EWSN
  // xy 10, shuffle NEWS
  // xy 20

  //xy 01
  for (const dir of dirs) { //dir E, starting 00
    const nx = x + dx[dir];
    const ny = y + dy[dir];
    if ((nx >= 0 && nx < maze.width) && (ny >= 0 && ny < maze.height) && (maze.maze[ny][nx].walls === 0)) {
      maze.maze[y][x].walls |= directions[dir]; //wall initally 0000, 0100
      maze.maze[ny][nx].walls |= opposite[dir];
      await dispatch(carveWall({
        x,
        y,
        direction: dir
      }));
      await sleep(5);
      await recursiveIteration(nx, ny, maze, dispatch);
    }
  }
  await dispatch(setCellColor({
    x,
    y,
    color: "rgba(0,0,0,0)"
  }));
  await sleep(5);
}

async function recursiveBacktrack(maze, dispatch) {
  const m = JSON.parse(JSON.stringify(maze));
  const sx = randInt(0, maze.width - 1);
  const sy = randInt(0, maze.height - 1);
  await recursiveIteration(sx, sy, m, dispatch);
}

async function wallFollower(maze, dispatch, start, end) {
  let dir = 'N';
  let current = start;

  while (true) {
    dispatch(addMove({
      move: current
    }));

    // If reached goal the break
    if (current[0] === end[0] && current[1] === end[1]) {
      break;
    }

    // Try to follow wall
    const walls = maze.maze[current[1]][current[0]].walls;

    if ((walls & turnRight[dir]) !== 0) {
      dir = rightDir[dir];
    } else if ((walls & directions[dir]) !== 0) {
    } else if ((walls & turnLeft[dir]) !== 0) {
      dir = leftDir[dir];
    } else {
      dir = rightDir[rightDir[dir]];
    }

    current = [current[0] + dx[dir], current[1] + dy[dir]];
    await sleep(50);
  }
}

function App() {
  const [size, setSize] = useState(10);
  const dispatch = useDispatch();
  const maze = useSelector(selectMaze);
  const start = useSelector((state) => state.solver.start);
  const end = useSelector((state) => state.solver.end);
  return (
    <div className="App">
      <h1>Maze <span id="solver">Solver</span></h1>

      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="number">Enter Maze Size</label>
              <input value={size} onInput={e => setSize(e.target.value)} id="number" type="number"></input>
              <button class="btn btn-primary" onClick={() => {
                dispatch(newMaze({ size }))
                dispatch(clearMoves());
                dispatch(setStartEnd({
                  start: [0, size - 1],
                  end: [size - 1, 0],
                }));
              }}>Initialize!</button>
            </div>
            <br></br>

            <div class="form-group">
              <label for="generationAlgo">Select Maze generation algorithm</label>
              <select id="generationAlgo">
                <option value="recursive">Recursive Backtracking</option>
                <option value="kruskal">Kruskal Algorithm</option>
                <option value="kruskal">Prim's Algorithm</option>
              </select>
              <button class="btn btn-primary" onClick={() => { recursiveBacktrack(maze, dispatch) }}>Generate Maze!</button>
            </div>
            <br></br>

            <div class="form-group">
              <label for="solvingAlgo">Select Maze solving algorithm</label>
              <select id="solvingAlgo">
                <option value="recursive">Wall Follower Algorithm</option>
                <option value="kruskal">Depth First Search</option>
              </select>
              <button class="btn btn-success" onClick={() => {
                wallFollower(maze, dispatch, start, end);
              }}>Solve Maze!</button>
            </div>
          </div>

          <br></br>
          <br></br>


          <div className="col-md-6">
            <div class="canvasContainer">
              <MazeCanvas size={500} />
              <SolverCanvas size={500} />
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}

export default App;
