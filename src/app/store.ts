import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import listsReducer from '../features/lists/listsSlice';
import groupsReducer from '../features/groups/groupsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
    groups: groupsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
