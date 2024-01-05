/**
 * Redux Slice for handling the creation, update, deletion, and fetching of posts.
 *
 * Example Usage:
 * import { createPostAction, updatePostAction, deletePostAction, fetchPostsAction, fetchPostDetailsAction, toggleLikePost, toggleUnlikePost } from './postSlice';
 *
 * // Create a new post
 * dispatch(createPostAction(post));
 *
 * // Update an existing post
 * dispatch(updatePostAction(post));
 *
 * // Delete a post
 * dispatch(deletePostAction(postId));
 *
 * // Fetch all posts
 * dispatch(fetchPostsAction(category));
 *
 * // Fetch post details
 * dispatch(fetchPostDetailsAction(id));
 *
 * // Like a post
 * dispatch(toggleLikePost(postId));
 *
 * // Unlike a post
 * dispatch(toggleUnlikePost(postId));
 *
 * Inputs:
 * - post: An object containing the details of a post (title, description, category, image).
 * - postId: The ID of a post.
 * - category: The category of posts to fetch.
 *
 * Flow:
 * 1. The createPostAction function is called with the post object as an argument.
 * 2. The function retrieves the user token from the Redux state.
 * 3. It creates a configuration object with the token in the headers.
 * 4. It creates a FormData object and appends the post details to it.
 * 5. It makes a POST request to the server using axios, passing the FormData and configuration.
 * 6. If the request is successful, the resetPost action is dispatched to reset the post state.
 * 7. The data from the server response is returned.
 * 8. If there is an error, the error response is checked and either the error data or the error itself is returned.
 *
 * Outputs:
 * - The data returned from the server response (e.g., the created post, updated post, list of posts, post details, likes count, unlikes count).
 * - Error data or the error itself if there is an error.
 */
//FIXME: Not getting appErr in state when blocked user tries to create a post.
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Reset Post Action
//----------------------------------------
const resetPost = createAction('category/reset');
const resetPostEdit = createAction('post/reset');
const resetPostDelete = createAction('post/delete');

//----------------------------------------
// Create Post Action
//----------------------------------------
export const createPostAction = createAsyncThunk(
  'post/created',
  async (post, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      // http call
      const formData = new FormData();
      formData.append('title', post?.title);
      formData.append('description', post?.description);
      formData.append('category', post?.category);
      formData.append('image', post?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      );
      // Dispatch Action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Update Post Action
//----------------------------------------
export const updatePostAction = createAsyncThunk(
  'post/updated',
  async (post, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      // http call
      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );
      // Dispatch Action
      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Delete Post Action
//----------------------------------------
export const deletePostAction = createAsyncThunk(
  'post/delete',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      // http call
      const { data } = await axios.delete(
        `${baseUrl}/api/posts/${postId}`,
        config
      );
      // Dispatch action
      dispatch(resetPostDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch All Posts Action
//----------------------------------------
export const fetchPostsAction = createAsyncThunk(
  'post/list',
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch Posts Details Action
//----------------------------------------
export const fetchPostDetailsAction = createAsyncThunk(
  'post/detail',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Like Posts Action
//----------------------------------------
export const toggleLikePost = createAsyncThunk(
  'post/like',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/likes`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Unlike Posts Action
//----------------------------------------
export const toggleUnlikePost = createAsyncThunk(
  'post/unLike',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // Get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/unLikes`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Slices
//----------------------------------------
const postSlice = createSlice({
  name: 'post',
  initialState: {},
  extraReducers: (builder) => {
    builder
      // Create post
      .addCase(createPostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPost, (state) => {
        state.isCreated = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.postCreated = action?.payload;
        state.loading = false;
        state.isCreated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Update post
      .addCase(updatePostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPostEdit, (state) => {
        state.isUpdated = true;
      })
      .addCase(updatePostAction.fulfilled, (state, action) => {
        state.postUpdated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isUpdated = false;
      })
      .addCase(updatePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Delete post
      .addCase(deletePostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPostDelete, (state) => {
        state.isDeleted = true;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        state.postUpdated = action?.payload;
        state.isDeleted = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deletePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Fetch posts
      .addCase(fetchPostsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAction.fulfilled, (state, action) => {
        state.postList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchPostsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Fetch post Details
      .addCase(fetchPostDetailsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
        state.postDetails = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchPostDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Likes
      .addCase(toggleLikePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        state.likes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Unlike Posts
      .addCase(toggleUnlikePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleUnlikePost.fulfilled, (state, action) => {
        state.unLikes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(toggleUnlikePost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
});

export default postSlice.reducer;
