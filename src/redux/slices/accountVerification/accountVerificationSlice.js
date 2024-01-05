/**
 * This code snippet is a JavaScript module that handles account verification in a Redux application.
 * It defines two asynchronous actions: `accountVerificationSendTokenAction` and `verifyAccountAction`.
 * These actions make HTTP requests to generate and verify an account verification token, respectively.
 *
 * Example Usage:
 * import { accountVerificationSendTokenAction, verifyAccountAction } from './accountVerificationSlice';
 * dispatch(accountVerificationSendTokenAction(email));
 * dispatch(verifyAccountAction(token));
 *
 * Inputs:
 * - email: The email address of the user requesting an account verification token.
 * - token: The account verification token to be verified.
 *
 * Flow:
 * 1. The `accountVerificationSendTokenAction` action is dispatched with the `email` as a parameter.
 * 2. The action retrieves the user's authentication token from the Redux store.
 * 3. An HTTP POST request is made to the server to generate an account verification token.
 * 4. If the request is successful, the generated token is returned.
 * 5. If there is an error, the error response is returned.
 * 6. The `verifyAccountAction` action is dispatched with the `token` as a parameter.
 * 7. The action retrieves the user's authentication token from the Redux store.
 * 8. An HTTP PUT request is made to the server to verify the account using the provided token.
 * 9. If the request is successful, the verification status is returned.
 * 10. If there is an error, the error response is returned.
 *
 * Outputs:
 * - accountVerificationSendTokenAction: The generated account verification token or an error response.
 * - verifyAccountAction: The verification status or an error response.
 */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Redirect to Home Page
//----------------------------------------
const resetAccountAction = createAction('account/verify-reset');

//----------------------------------------
// Create Account Verification Token
//----------------------------------------
export const accountVerificationSendTokenAction = createAsyncThunk(
  'account/token',
  async (email, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
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
// Verify Account
//----------------------------------------
export const verifyAccountAction = createAsyncThunk(
  'account/verify',
  async (token, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/verify-account`,
        { token },
        config
      );
      // Redirect to Home Page
      dispatch(resetAccountAction());
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
const accountVerificationSlices = createSlice({
  name: 'account',
  initialState: {
    loading: false
  },
  extraReducers: (builder) => {
    // Create Token
    builder
      .addCase(accountVerificationSendTokenAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        accountVerificationSendTokenAction.fulfilled,
        (state, action) => {
          state.token = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
        }
      )
      .addCase(accountVerificationSendTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    // Verify Account
    builder
      .addCase(verifyAccountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetAccountAction, (state) => {
        state.isVerified = true;
      })
      .addCase(verifyAccountAction.fulfilled, (state, action) => {
        state.verified = action?.payload;
        state.loading = false;
        state.isVerified = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(verifyAccountAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
});

export default accountVerificationSlices.reducer;
