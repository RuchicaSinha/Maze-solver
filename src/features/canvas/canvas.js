import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { directions } from "../../models/Wall";
import { selectMaze } from "./mazeSlice";

function drawLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
}

function fillRect(ctx, p, dim, color) {
    const prev = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(p[0], p[1], dim, dim);
    ctx.fillStyle = prev;
}

function fillCell(ctx, dim, color, x, y) {
    const tl = [x * dim, y * dim];
    fillRect(ctx, tl, dim, color);
}

function drawCellWalls(ctx, walls, dim, x, y) {
    const tl = [x * dim, y * dim];
    const tr = [x * dim + dim, y * dim];
    const bl = [x * dim, y * dim + dim];
    const br = [x * dim + dim, y * dim + dim];
    if ((walls & directions.N) === 0) {
        drawLine(ctx, tl, tr);
    }

    if ((walls & directions.E) === 0) {
        drawLine(ctx, tr, br);
    }

    if ((walls & directions.W) === 0) {
        drawLine(ctx, tl, bl);
    }

    if ((walls & directions.S) === 0) {
        drawLine(ctx, bl, br);
    }
}

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