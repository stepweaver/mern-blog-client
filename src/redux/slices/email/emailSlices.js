/**
 * Redux Toolkit Slice for sending emails.
 *
 * @module sendMailSlice
 */

import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../../../utils/baseURL';

//----------------------------------------
// Redirect
//----------------------------------------

/**
 * Action creator for resetting the email state.
 *
 * @type {import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>}
 */
const resetEmailAction = createAction('mail/reset');

//----------------------------------------
// Create
//----------------------------------------

/**
 * Async thunk action for sending an email.
 *
 * @type {import("@reduxjs/toolkit").AsyncThunk<any, any, {}>}
 */
export const sendMailAction = createAsyncThunk(
  'mail/sent',
  /**
   * Sends an email using the provided email details.
   *
   * @param {object} email - The email details.
   * @param {import("@reduxjs/toolkit").ThunkAPI} thunkAPI - The Redux Toolkit thunk API.
   * @returns {Promise<any>} - A promise that resolves to the response data if the request is successful, or rejects with the error response data if there is an error.
   */
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
        `${baseUrl}/api/email`,
        {
          to: email?.recipientEmail,
          subject: email?.subject,
          message: email?.message
        },
        config
      );
      dispatch(resetEmailAction());
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

/**
 * Redux Toolkit slice for handling email sending state.
 *
 * @type {import("@reduxjs/toolkit").Slice<{ loading: boolean; isMailSent?: boolean; mailSent?: any; appErr?: string; serverErr?: string; }, { loading: boolean; isMailSent?: boolean; mailSent?: any; appErr?: string; serverErr?: string; }, string>}
 */
const sendMailSlices = createSlice({
  name: 'mail',
  initialState: {
    loading: false
  },
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(sendMailAction.pending, (state) => {
        state.loading = true;
      })
      // Redirect
      .addCase(resetEmailAction, (state) => {
        state.isMailSent = true;
      })
      .addCase(sendMailAction.fulfilled, (state, action) => {
        state.mailSent = action?.payload;
        state.isMailSent = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(sendMailAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  }
});

export default sendMailSlices.reducer;
