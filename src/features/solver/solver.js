import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectMaze } from "../canvas/mazeSlice";

export function SolverCanvas(props) {
    const { size } = props;
    const canvasRef = useRef(null);

    const maze = useSelector(selectMaze);

    return <canvas ref={canvasRef} width={size} height={size} />
}
