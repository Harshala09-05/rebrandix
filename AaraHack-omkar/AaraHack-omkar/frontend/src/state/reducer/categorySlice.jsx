import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('category/fetch', async () => {
  const res = await fetch(import.meta.env.VITE_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      query: `{
        allCategories {
          id
          name
          description
        }
      }`,
    }),
  });
  const data = await res.json();
  return data.data.allCategories;
});

export const createCategory = createAsyncThunk('category/create', async (payload) => {
  const res = await fetch(import.meta.env.VITE_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      query: `
        mutation {
          createCategory(
            name: "${payload.name}",
            description: "${payload.description}"
          ) {
            category {
              id
              name
              description
            }
          }
        }
      `,
    }),
  });
  const data = await res.json();
  return data.data.createCategory.category;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearCategoryMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.success = 'Category created successfully!';
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearCategoryMessage } = categorySlice.actions;
export default categorySlice.reducer;
