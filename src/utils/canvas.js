import { directions } from "../models/Wall";

export function drawLine(ctx, p1, p2) {
    ctx.beginPath();
    const prevCap = ctx.lineCap;
    const prevWidth = ctx.lineWidth;
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fafafa";
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
    ctx.lineCap = prevCap;
    ctx.lineWidth = prevWidth;
}

export function fillRect(ctx, p, dim, color) {
    const prev = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(p[0], p[1], dim, dim);
    ctx.fillStyle = prev;
}

export function fillCell(ctx, dim, color, x, y) {
    const tl = [x * dim, y * dim];
    fillRect(ctx, tl, dim, color);
}

export function drawCellWalls(ctx, walls, dim, x, y) {
    const tl = [x * dim, y * dim];
    const tr = [x * dim + dim, y * dim];
    const bl = [x * dim, y * dim + dim];
    const br = [x * dim + dim, y * dim + dim];
    if ((walls & directions.N) === 0) { //0110 and 0001
        drawLine(ctx, tl, tr);
    }

    if ((walls & directions.E) === 0) { //0110 and 0100
        drawLine(ctx, tr, br);
    }

    if ((walls & directions.W) === 0) {
        drawLine(ctx, tl, bl);
    }

    if ((walls & directions.S) === 0) {
        drawLine(ctx, bl, br);
    }
}