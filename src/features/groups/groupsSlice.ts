import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

interface Group {
  id: string;
  name: string;
  lists: string[];
}

interface GroupsState {
  items: Group[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GroupsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const response = await api.get('/Group');
  return response.data;
});

export const addGroup = createAsyncThunk('groups/addGroup', async (newGroup: Omit<Group, 'id'>) => {
  const response = await api.post('/Group', newGroup);
  return response.data;
});

export const updateGroup = createAsyncThunk('groups/updateGroup', async (group: Group) => {
  const response = await api.put(`/Group/${group.id}`, group);
  return response.data;
});

export const deleteGroup = createAsyncThunk('groups/deleteGroup', async (id: string) => {
  await api.delete(`/Group/${id}`);
  return id;
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch groups';
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.items.findIndex(group => group.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.items = state.items.filter(group => group.id !== action.payload);
      });
  },
});

export default groupsSlice.reducer;
