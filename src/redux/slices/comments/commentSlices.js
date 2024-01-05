/**
 * This code snippet is a JavaScript module that handles comment-related actions in a Redux store. It includes the creation, deletion, update, and fetching of comments. The module uses the `createAsyncThunk` function from the `@reduxjs/toolkit` library to create asynchronous actions. It also defines a `resetCommentAction` action and a `commentSlice` reducer.
 *
 * Example Usage:
 * import { createCommentAction, deleteCommentAction, updateCommentAction, fetchCommentAction } from './commentSlice';
 *
 * dispatch(createCommentAction({ description: 'New comment', postId: 1 }));
 * dispatch(deleteCommentAction(1));
 * dispatch(updateCommentAction({ id: 1, description: 'Updated comment' }));
 * dispatch(fetchCommentAction(1));
 *
 * Inputs:
 * - `comment`: An object containing the comment details (e.g., `description` and `postId`).
 * - `commentId`: The ID of the comment to be deleted or updated.
 * - `id`: The ID of the comment to be fetched.
 *
 * Outputs:
 * - The `createCommentAction` returns the created comment data.
 * - The `deleteCommentAction` returns the ID of the deleted comment.
 * - The `updateCommentAction` returns the updated comment data.
 * - The `fetchCommentAction` returns the fetched comment data.
 */
//FIXME: error not displaying for rejected comment actions.
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Redirect Actions
//----------------------------------------
const resetCommentAction = createAction('comment/reset');

// Get headers with userAuth token
const getHeaders = (userAuth) => ({
  headers: {
    Authorization: `Bearer ${userAuth?.token || ''}`
  }
});

//----------------------------------------
// Create Comment
//----------------------------------------
export const createCommentAction = createAsyncThunk(
  'comment/create',
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/comments`,
        {
          description: comment?.description,
          postId: comment?.postId
        },
        config
      );
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
// Delete Comment
//----------------------------------------
export const deleteCommentAction = createAsyncThunk(
  'comment/delete',
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userAuth } = getState().users;
      const config = getHeaders(userAuth);

      await axios.delete(`${baseUrl}/api/comments/${commentId}`, config);
      return commentId;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Update Comment
//----------------------------------------
export const updateCommentAction = createAsyncThunk(
  'comment/update',
  async (comment, { rejectWithValue, getState, dispatch }) => {
    if (!comment?.id || !comment?.description) {
      return rejectWithValue({ message: 'Invalid comment object' });
    }

    try {
      const { userAuth } = getState().users;
      const config = getHeaders(userAuth);

      await axios.put(
        `${baseUrl}/api/comments/${comment?.id}`,
        { description: comment?.description },
        config
      );
      // Dispatch Action
      dispatch(resetCommentAction());
      return comment;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch Comment Details
//----------------------------------------
export const fetchCommentAction = createAsyncThunk(
  'comment/fetch-details',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { userAuth } = getState().users;
      const { data } = await axios.get(
        `${baseUrl}/api/comments/${id}`,
        getHeaders(userAuth)
      );
      return data;
    } catch (error) {
      if (error.response === undefined) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

//----------------------------------------
// Slices
//----------------------------------------
const commentSlice = createSlice({
  name: 'comment',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Comment
      .addCase(createCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentCreated = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.commentCreated = undefined;
        state.appErr = action.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Delete Comment
      .addCase(deleteCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDeleted = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deleteCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.commentCreated = undefined;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })

      // Update Comment
      .addCase(updateCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCommentAction, (state) => {
        state.isUpdated = true;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentUpdated = action?.payload;
        state.isUpdated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.commentCreated = undefined;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })

      // Fetch Comment Details
      .addCase(fetchCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDetails = action.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.commentCreated = undefined;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      });
  }
});

export default commentSlice.reducer;
