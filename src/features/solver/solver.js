import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMaze } from "../canvas/mazeSlice";
import { selectMoves } from "./solverSlice";

export function SolverCanvas(props) {
    const { size } = props;
    const canvasRef = useRef(null);
    // const dispatch = useDispatch();

    const maze = useSelector(selectMaze);
    const moves = useSelector(selectMoves);

    useEffect(() => {
        // const dim = size/maze.width;
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [maze, moves, size])

    return <canvas ref={canvasRef} width={size} height={size} />
}
