import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

interface List {
    id: string;
    name: string;
    tasks: any[];
    groupId: string;
    taskIds: string[];
}


interface ListsState {
  items: List[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ListsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await api.get('/List');
  return response.data;
});

export const addList = createAsyncThunk('lists/addList', async (newList: Omit<List, 'id'>) => {
  const response = await api.post('/List', newList);
  return response.data;
});

export const updateList = createAsyncThunk('lists/updateList', async (list: List) => {
  const response = await api.put(`/List/${list.id}`, list);
  return response.data;
});

export const deleteList = createAsyncThunk('list/deleteList', async (id: string) => {
  await api.delete(`/List/${id}`);
  return id;
});

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch lists';
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.items.findIndex(list => list.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter(list => list.id !== action.payload);
      });
  },
});

export default listsSlice.reducer;
