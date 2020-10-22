import { createSlice } from "@reduxjs/toolkit";

export const solverSlice = createSlice({
    name: 'solver',
    initialState: {
        moves: [[0,0], [0,1], [0,2]],
    },
    reducers: {
        clearMoves: state => {
            state.moves = [];
        },
        addMove: (state, action) => {
            const { move } = action.payload;
            state.moves.push(move);
        }
    },
})

export const { clearMoves, addMove } = solverSlice.actions;

export const selectMoves = state => state.solver.moves;

export default solverSlice.reducer;
