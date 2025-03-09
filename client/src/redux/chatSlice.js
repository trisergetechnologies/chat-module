import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  selectedUser: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  }
});

export const { setMessages, addMessage, selectUser } = chatSlice.actions;
export default chatSlice.reducer;
