export const directions = {
    N: 1, //rightmost-bit
    S: 2, 
    E: 4,
    W: 8,
}

export const opposite = {
    N: directions.S,
    S: directions.N,
    E: directions.W,
    W: directions.E
}

export const turnRight = {
    N: directions.E,
    E: directions.S,
    S: directions.W,
    W: directions.N,
}

export const rightDir = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
}

export const turnLeft = {
    N: directions.W,
    W: directions.S,
    S: directions.E,
    E: directions.N,
}

export const leftDir = {
    N: "W",
    W: "S",
    S: "E",
    E: "N",
}

export const dx = {
    N: 0,
    S: 0,
    E: 1,
    W: -1
}

export const dy = {
    N: -1,
    S: 1,
    E: 0,
    W: 0,
}
