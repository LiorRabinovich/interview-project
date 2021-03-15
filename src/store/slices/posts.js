import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../api/posts'
import { translate } from '../../api/google-translate'

async function fetchTranslateSinglePost(item, language) {
  const response = await translate([item.title, item.body], language);
  if (response.error) throw response.error;
  const { translations } = response.data;
  const [title, body] = translations;
  return { ...item, title: title.translatedText, body: body.translatedText };
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', getPosts)
export const fetchTranslatePosts = createAsyncThunk('posts/fetchTranslatePosts', async (language, { getState }) => {
  const { items } = getState().posts;

  const posts = await Promise.all(
    items.map((item) => fetchTranslateSinglePost(item, language))
  )

  return { language, posts };
})

function pending(state) {
  state.error = null;
  state.loading = true;
}

function rejected(state, { payload, error }) {
  state.loading = false;
  state.error = payload?.errorMessage || error.message;
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    error: null,
    language: 'en',
    items: [],
    pageSize: 10,
    displayItems: [],
  },
  reducers: {
    like: (state, { payload }) => {
      const { like = 0 } = state.items[payload];
      state.items[payload].like = like + 1;
    },
    disLike: (state, { payload }) => {
      const { dislike = 0 } = state.items[payload];
      state.items[payload].dislike = dislike + 1;
    }
  },
  extraReducers: {
    [fetchPosts.pending]: pending,
    [fetchPosts.rejected]: rejected,
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [fetchTranslatePosts.pending]: pending,
    [fetchTranslatePosts.rejected]: rejected,
    [fetchTranslatePosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const { language, posts } = payload;
      state.language = language;
      state.items = posts;
    },
  }
});

export const selectPostsLanguage = state => state.posts.language;
export const selectPostsError = state => state.posts.error;
export const selectPostsLoading = state => state.posts.loading;
export const selectPostsPageSize = state => state.posts.pageSize;
export const selectPostsItems = state => state.posts.items;
export const postsReducer = postsSlice.reducer;
export const { actions } = postsSlice;
