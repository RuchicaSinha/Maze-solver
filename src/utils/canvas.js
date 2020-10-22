import { directions } from "../models/Wall";

export function drawLine(ctx, p1, p2, color, width) {
    ctx.beginPath();
    const prevCap = ctx.lineCap;
    const prevWidth = ctx.lineWidth;
    const prevColor = ctx.strokeStyle;
    ctx.lineCap = "round";
    ctx.lineWidth = width || 3;
    ctx.strokeStyle = color || "#fafafa";
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
    ctx.lineCap = prevCap;
    ctx.lineWidth = prevWidth;
    ctx.strokeStyle = prevColor;
}

export function drawPath(ctx, dim, x1, y1, x2, y2) {
    const c1 = [x1 * dim + (dim / 2), y1 * dim + (dim / 2)];
    const c2 = [x2 * dim + (dim / 2), y2 * dim + (dim / 2)];
    drawLine(ctx, c1, c2, "rgba(0,255,0,1)", 7);
}

export function fillCircle(ctx, p, dim, color) {
    const c = [p[0] * dim + (dim / 2), p[1] * dim + (dim / 2)];
    ctx.beginPath();
    ctx.arc(c[0], c[1], (dim/3)-(dim/10), 0, 2 * Math.PI, false);
    const prev = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.fillStyle = prev;
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