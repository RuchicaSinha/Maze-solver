import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mazeReducer from '../features/canvas/mazeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    maze: mazeReducer,
  },
});
