import { createSlice } from "@reduxjs/toolkit";
import { directions, dx, dy, opposite } from "../../models/Wall";

function genMaze(size) {
    const maze = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push({
                walls: 0,
                bgColor: 'rgba(0,0,0,0)',
            });
        }
        maze.push(row);
    }
    return maze;
}

export const mazeSlice = createSlice({
    name: 'maze',
    initialState: {
        maze: {
            width: 10,
            height: 10,
            maze: genMaze(10),
        }
    },
    reducers: {
        newMaze: (state, action) => {
            const { size } = action.payload;
            state.maze.width = size;
            state.maze.height = size;
            state.maze.maze = genMaze(size);
        },
        setMaze: (state, action) => {
            const { maze } = action.payload;
            state.maze.maze = maze;
        },
        carveWall: (state, action) => {
            const { x, y, direction } = action.payload;
            const nx = x + dx[direction];
            const ny = y + dy[direction];

            state.maze.maze[y][x].walls |= directions[direction];
            state.maze.maze[ny][nx].walls |= opposite[direction];
        },
        setCellColor: (state, action) => {
            const { x, y, color } = action.payload;
            state.maze.maze[y][x].bgColor = color;
        }
    }
});

export const { newMaze, setMaze, carveWall, setCellColor } = mazeSlice.actions;
export const selectMaze = state => state.maze.maze;

export default mazeSlice.reducer;
