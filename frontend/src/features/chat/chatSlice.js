import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendBeautyMessage = createAsyncThunk(
  'chat/sendBeautyMessage',
  async (message, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/v1/chat/beauty-helper', { message });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Chat failed' });
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [
      {
        role: 'bot',
        text: 'Hi! I am your LeaBeauty helper. Ask me for Lips, Eyes, Face, or Nails products.',
        products: [],
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    clearChatError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBeautyMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.messages.push({
          role: 'user',
          text: action.meta.arg,
          products: [],
        });
      })
      .addCase(sendBeautyMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: 'bot',
          text: action.payload.reply,
          products: action.payload.products || [],
        });
      })
      .addCase(sendBeautyMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      });
  },
});

export const { clearChatError } = chatSlice.actions;
export default chatSlice.reducer;