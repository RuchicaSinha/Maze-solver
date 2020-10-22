import { createSlice } from "@reduxjs/toolkit";

export const solverSlice = createSlice({
    name: 'solver',
    initialState: {
        moves: [[0,0], [0,1], [0,2]],
    },
    reducers: {},
})

export default solverSlice.reducer;
