import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { RootState } from '../../app/store';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  listId: string;
  groupId: string;
  assignedUsers: string[];
  startDate: Date;
  endDate: Date;
  completed: boolean;
}

interface TasksState {
  items: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get('/Task'); 
  return response.data as Task[];
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask: Omit<Task, 'id'>) => {
  const response = await api.post('/Task', newTask); 
  return response.data as Task;
});

export const editTask = createAsyncThunk('tasks/editTask', async (task: { id: string; updatedTask: Partial<Task> }) => {
  const response = await api.put(`/Task/${task.id}`, task.updatedTask); 
  return response.data as Task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await api.delete(`/Task/${id}`); 
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      });
  },
});

export const { toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksError = (state: RootState) => state.tasks.error;