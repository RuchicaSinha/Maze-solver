import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { drawCellWalls, fillCell } from "../../utils/canvas";
import { selectMaze } from "./mazeSlice";


export function MazeCanvas(props) {
    const { size } = props;
    const canvasRef = useRef(null);

    const maze = useSelector(selectMaze);

    useEffect(() => {
        const dim = size / maze.width;
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < maze.width; i++) {
            for (let j = 0; j < maze.height; j++) {
                fillCell(ctx, dim, maze.maze[j][i].bgColor, i, j);
            }
        }
        for (let i = 0; i < maze.width; i++) {
            for (let j = 0; j < maze.height; j++) {
                drawCellWalls(ctx, maze.maze[j][i].walls, dim, i, j)
            }
        }
    }, [maze, size]);

    return <canvas ref={canvasRef} width={size} height={size} />
}