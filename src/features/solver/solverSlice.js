import { createSlice } from "@reduxjs/toolkit";

export const solverSlice = createSlice({
    name: 'solver',
    initialState: {
        moves: [],
        start: [0,9],
        end: [9,0],
    },
    reducers: {
        clearMoves: state => {
            state.moves = [];
        },
        addMove: (state, action) => {
            const { move } = action.payload;
            state.moves.push(move);
        },
        setStartEnd: (state, action) => {
            const { start, end } = action.payload;
            state.start = start;
            state.end = end;
        }
    },
})

export const { clearMoves, addMove, setStartEnd } = solverSlice.actions;

export const selectMoves = state => state.solver.moves;

export default solverSlice.reducer;
