import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { languagesReducer } from './slices/languages';

export const store = configureStore({
  reducer: {
    languages: languagesReducer,
    posts: postsReducer,
  },
});
