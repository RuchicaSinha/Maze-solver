import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fillCell } from "../../utils/canvas";
import { selectMaze } from "../canvas/mazeSlice";
import { selectMoves } from "./solverSlice";

export function SolverCanvas(props) {
    const { size } = props;
    const canvasRef = useRef(null);
    // const dispatch = useDispatch();

    const maze = useSelector(selectMaze);
    const moves = useSelector(selectMoves);

    const start = [0,maze.height-1]
    const end = [maze.width-1, 0]

    useEffect(() => {
        const dim = size/maze.width;
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(end);
        fillCell(ctx, dim, "rgba(255,0,0,0.5)", start[0], start[1]);
        fillCell(ctx, dim, "rgba(0,255,0,0.5)", end[0], end[1]);

        
    }, [maze, moves, size, start, end])

    return <canvas ref={canvasRef} width={size} height={size} />
}
