/**
 * Configures the Redux store using the `configureStore` function from the `@reduxjs/toolkit` package.
 * Sets up the store with multiple reducers for different slices of the application state.
 *
 * @returns {Object} The configured Redux store.
 */
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlice';
import post from '../slices/posts/postSlice';
import comment from '../slices/comments/commentSlices';
import sendMail from '../slices/email/emailSlices';
import accountVerification from '../slices/accountVerification/accountVerificationSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
    comment,
    sendMail,
    accountVerification
  }
});

export default store;
