import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { drawPath, fillCell, fillCircle } from "../../utils/canvas";
import { selectMaze } from "../canvas/mazeSlice";
import { selectMoves } from "./solverSlice";

export function SolverCanvas(props) {
    const { size } = props;
    const canvasRef = useRef(null);
    // const dispatch = useDispatch();

    const maze = useSelector(selectMaze);
    const moves = useSelector(selectMoves);

    const start = useSelector((state) => state.solver.start);
    const end = useSelector((state) => state.solver.end);

    useEffect(() => {
        const dim = size/maze.width;
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fillCell(ctx, dim, "rgba(255,0,0,0.5)", start[0], start[1]);
        fillCell(ctx, dim, "rgba(0,255,0,0.5)", end[0], end[1]);

        if (moves.length >= 2) {
            let prev = moves[0];
            for (const move of moves.slice(1)) {
                drawPath(ctx, dim, prev[0], prev[1], move[0], move[1]);
                prev = move;
            }
            fillCircle(ctx, prev, dim, "rgba(0,255,0,1)")
        }
        
    }, [maze, moves, size, start, end])

    return <canvas ref={canvasRef} width={size} height={size} />
}
