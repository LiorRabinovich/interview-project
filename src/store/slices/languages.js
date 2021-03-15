import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLanguages } from '../../api/google-translate';

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  const languages = await getLanguages();
  if (languages.error) throw languages.error;
  return languages;
});

export const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    loading: false,
    items: [],
    error: null
  },
  extraReducers: {
    [fetchLanguages.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchLanguages.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload?.errorMessage || error.message;
    },
    [fetchLanguages.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload.data.languages;
    },
  }
});

export const selectLanguagesItems = state => state.languages.items;
export const selectLanguagesError = state => state.languages.error;
export const selectLanguagesLoading = state => state.languages.loading;
export const languagesReducer = languagesSlice.reducer;
