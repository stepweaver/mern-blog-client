/**
 * Redux Toolkit module for handling CRUD operations for a category entity.
 *
 * This module defines several async thunks for creating, fetching, updating, and deleting categories.
 * It also includes actions for resetting the state after certain operations.
 * The thunks make HTTP requests using Axios and include logic for handling success and error responses.
 *
 * Example Usage:
 * import { createCategoryAction, fetchCategoriesAction, updateCategoriesAction, deleteCategoriesAction } from './categorySlice';
 *
 * // Create a new category
 * dispatch(createCategoryAction({ title: 'New Category' }));
 *
 * // Fetch all categories
 * dispatch(fetchCategoriesAction());
 *
 * // Update a category
 * dispatch(updateCategoriesAction({ id: 1, title: 'Updated Category' }));
 *
 * // Delete a category
 * dispatch(deleteCategoriesAction(1));
 *
 * @module categorySlice
 */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Redirect Actions
//----------------------------------------
const resetEditAction = createAction('category/reset');
const resetDeleteAction = createAction('category/delete-reset');
const resetCategoryAction = createAction('category/created-reset');

//----------------------------------------
// Create Category
//----------------------------------------
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    // http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title
        },
        config
      );
      // Dispatch Action
      dispatch(resetCategoryAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch All Categories
//----------------------------------------
export const fetchCategoriesAction = createAsyncThunk(
  'category/fetch',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    // http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Update Category
//----------------------------------------
export const updateCategoriesAction = createAsyncThunk(
  'category/update',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    // http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
        config
      );
      // Dispatch to rest updateCategory
      dispatch(resetEditAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Delete Category
//----------------------------------------
export const deleteCategoriesAction = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    // http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        config
      );

      // Dispatch Action
      dispatch(resetDeleteAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch Category Details
//----------------------------------------
export const fetchCategoryAction = createAsyncThunk(
  'category/details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    // http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Slices
//----------------------------------------
const categorySlices = createSlice({
  name: 'category',
  initialState: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
      })
      // Redirect
      .addCase(resetCategoryAction, (state) => {
        state.isCreated = true;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Fetch All
      .addCase(fetchCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAction.fulfilled, (state, action) => {
        state.categoryList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Update Category
      .addCase(updateCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      // Redirect
      .addCase(resetEditAction, (state) => {
        state.isEdited = true;
      })
      .addCase(updateCategoriesAction.fulfilled, (state, action) => {
        state.updateCategory = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Delete Category
      .addCase(deleteCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      // Redirect
      .addCase(resetDeleteAction, (state) => {
        state.isDeleted = true;
      })
      .addCase(deleteCategoriesAction.fulfilled, (state, action) => {
        state.deletedCategory = action?.payload;
        state.isDeleted = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deleteCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Fetch Category Details
      .addCase(fetchCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.category = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
});

export default categorySlices.reducer;
