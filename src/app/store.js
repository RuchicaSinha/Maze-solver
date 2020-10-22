import { configureStore } from '@reduxjs/toolkit';
import solverReducer from '../features/solver/solverSlice';
import mazeReducer from '../features/canvas/mazeSlice';

export default configureStore({
  reducer: {
    solver: solverReducer,
    maze: mazeReducer,
  },
});
