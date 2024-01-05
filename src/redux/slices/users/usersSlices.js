/**
 * Redux Toolkit Slice for User Authentication and Profile Management
 *
 * This code snippet defines a Redux Toolkit slice that handles user authentication and profile management. It includes actions for registering, logging in, fetching user details, updating user information, following/unfollowing other users, blocking/unblocking users, uploading profile photos, and logging out.
 *
 * Example Usage:
 * import { useDispatch } from 'react-redux';
 * import { loginUserAction } from './path/to/usersSlice';
 *
 * const LoginForm = () => {
 *   const dispatch = useDispatch();
 *
 *   const handleLogin = (userData) => {
 *     dispatch(loginUserAction(userData));
 *   };
 *
 *   // rest of the component code
 * };
 *
 * Inputs:
 * - user: An object containing user information (e.g., username, password) for registration.
 * - userData: An object containing user credentials (e.g., email, password) for login.
 * - id: The ID of a user for fetching user details or blocking/unblocking a user.
 * - userToFollowId: The ID of a user to follow.
 * - unFollowId: The ID of a user to unfollow.
 * - userData: An object containing updated user information (e.g., firstName, lastName, email, bio).
 * - userImg: An object containing the user's profile photo.
 *
 * Outputs:
 * - The actions trigger HTTP requests and return the response data or error message.
 * - The state is updated based on the action status and payload, including loading indicators and error messages.
 */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Redirect
//----------------------------------------
const resetUserAction = createAction('users/profile/reset');
const resetPasswordAction = createAction('password/reset');

//----------------------------------------
// Register
//----------------------------------------
export const registerUserAction = createAsyncThunk(
  'users/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
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
// Login
//----------------------------------------
export const loginUserAction = createAsyncThunk(
  'users/login',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      // Save user to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
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
// Profile
//----------------------------------------
export const userProfileAction = createAsyncThunk(
  'user/profile',
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
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${id}`,
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
// Follow
//----------------------------------------
export const followUserAction = createAsyncThunk(
  'user/follow',
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/follow`,
        { followId: userToFollowId },
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
// Unfollow
//----------------------------------------
export const unfollowUserAction = createAsyncThunk(
  'user/unfollow',
  async (unFollowId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/unfollow`,
        { unFollowId },
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
// Update User
//----------------------------------------
export const updateUserAction = createAsyncThunk(
  'users/update',
  async (userData, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          bio: userData.bio
        },
        config
      );
      // Dispatch Action
      dispatch(resetUserAction());
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
// Update Password
//----------------------------------------
export const updatePasswordAction = createAsyncThunk(
  'password/update',
  async (password, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/password`,
        {
          password
        },
        config
      );
      // Dispatch Action
      dispatch(resetPasswordAction());
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
// Fetch User Details
//----------------------------------------
export const fetchUserDetailsAction = createAsyncThunk(
  'user/detail',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Fetch All Users
//----------------------------------------
export const fetchUsersAction = createAsyncThunk(
  'user/list',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Block User
//----------------------------------------
export const blockUserAction = createAsyncThunk(
  'user/block',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { token } = user.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/block-user/${id}`,
        {},
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
// Unblock User
//----------------------------------------
export const unblockUserAction = createAsyncThunk(
  'user/unblock',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { token } = user.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/unblock-user/${id}`,
        {},
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
// Logout
//----------------------------------------
export const logoutUserAction = createAsyncThunk(
  '/user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem('userInfo');
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------
// Upload Profile Photo
//----------------------------------------
export const uploadProfilePhotoAction = createAsyncThunk(
  'user/profile-photo',
  async (userImg, { rejectWithValue, getState, dispatch }) => {
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
      formData.append('image', userImg?.image);

      const { data } = await axios.put(
        `${baseUrl}/api/users/profile-photo-upload`,
        formData,
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
// Password Reset Token Generator
//----------------------------------------
export const passwordResetTokenAction = createAsyncThunk(
  'password/token',
  async (email, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/forget-password-token`,
        { email },
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
// Password Reset
//----------------------------------------
export const passwordResetAction = createAsyncThunk(
  'password/reset',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.put(
        `${baseUrl}/api/users/reset-password`,
        { password: user?.password, resetToken: user?.resetToken },
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

// Get user from localStorage and place into store
const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//----------------------------------------
// Slices
//----------------------------------------
const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: userLoginFromStorage,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Password Reset Token Generator
      .addCase(passwordResetTokenAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(passwordResetTokenAction.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordToken = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(passwordResetTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Password Reset
      .addCase(passwordResetAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(passwordResetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordReset = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(passwordResetAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // User Details
      .addCase(fetchUserDetailsAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchUserDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Fetch All Users
      .addCase(fetchUsersAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Block User
      .addCase(blockUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(blockUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.blocked = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(blockUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Unblock User
      .addCase(unblockUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(unblockUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.unblocked = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(unblockUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // User Follow
      .addCase(followUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(followUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.followed = action?.payload;
        state.unFollowed = undefined;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(followUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.unFollowed = undefined;
        state.serverErr = action?.error?.message;
      })

      // User UnFollow
      .addCase(unfollowUserAction.pending, (state) => {
        state.unfollowLoading = true;
        state.unfollowAppErr = undefined;
        state.unfollowServerErr = undefined;
      })
      .addCase(unfollowUserAction.fulfilled, (state, action) => {
        state.unfollowLoading = false;
        state.unFollowed = action?.payload;
        state.followed = undefined;
        state.unfollowAppErr = undefined;
        state.unfollowServerErr = undefined;
      })
      .addCase(unfollowUserAction.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowAppErr = action?.payload?.message;
        state.unfollowServerErr = action?.error?.message;
      })

      // Login
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.userAuth = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Profile
      .addCase(userProfileAction.pending, (state) => {
        state.profileLoading = true;
        state.profileAppErr = undefined;
        state.profileServerErr = undefined;
      })
      .addCase(userProfileAction.fulfilled, (state, action) => {
        state.profile = action?.payload;
        state.profileLoading = false;
        state.profileAppErr = undefined;
        state.profileServerErr = undefined;
      })
      .addCase(userProfileAction.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileAppErr = action?.payload?.message;
        state.profileServerErr = action?.error?.message;
      })

      // Update User
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(resetUserAction, (state) => {
        state.isUpdated = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userUpdated = action?.payload;
        state.isUpdated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Update Password
      .addCase(updatePasswordAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(resetPasswordAction, (state) => {
        state.isPasswordUpdated = true;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordUpdated = action?.payload;
        state.isPasswordUpdated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Upload Profile Photo
      .addCase(uploadProfilePhotoAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
        state.profilePhoto = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(uploadProfilePhotoAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })

      // Logout
      .addCase(logoutUserAction.pending, (state) => {
        state.loading = false;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.userAuth = undefined;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
});

export default usersSlices.reducer;
