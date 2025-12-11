import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: JSON.parse(localStorage.getItem('youtube-subscriptions') || '[]'),
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    subscribe: (state, action) => {
      const channel = action.payload;
      const exists = state.channels.some(c => c.id === channel.id);
      if (!exists) {
        state.channels.push({
          ...channel,
          subscribedAt: new Date().toISOString(),
        });
        localStorage.setItem('youtube-subscriptions', JSON.stringify(state.channels));
      }
    },
    unsubscribe: (state, action) => {
      state.channels = state.channels.filter(c => c.id !== action.payload);
      localStorage.setItem('youtube-subscriptions', JSON.stringify(state.channels));
    },
    clearSubscriptions: (state) => {
      state.channels = [];
      localStorage.removeItem('youtube-subscriptions');
    },
  },
});

export const { subscribe, unsubscribe, clearSubscriptions } = subscriptionsSlice.actions;

export const selectSubscriptions = (state) => state.subscriptions.channels;
export const selectIsSubscribed = (channelId) => (state) =>
  state.subscriptions.channels.some(c => c.id === channelId);

export default subscriptionsSlice.reducer;
