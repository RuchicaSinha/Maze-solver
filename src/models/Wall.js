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
