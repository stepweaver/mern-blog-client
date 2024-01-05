/**
 * React functional component that renders a form for updating a comment.
 * Uses the `useFormik` hook from the `formik` library to handle form state and validation.
 * Fetches the comment details from the Redux store using the `fetchCommentAction` function.
 * Dispatches the `updateCommentAction` function to update the comment in the Redux store.
 * Redirects the user back to the previous page after the comment is successfully updated.
 *
 * @returns {JSX.Element} The rendered form for updating a comment.
 */
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import {
  fetchCommentAction,
  updateCommentAction
} from '../../redux/slices/comments/commentSlices';

// Form Schema
const formSchema = Yup.object({
  description: Yup.string().required('Description is required')
});

const UpdateComment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch Comment Details from store
  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  // Select comment from store
  const comment = useSelector((state) => state?.comment);
  const { commentDetails, isUpdated } = comment;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description || ''
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values?.description
      };
      // Dispatch action
      dispatch(updateCommentAction(data));
    },
    validationSchema: formSchema
  });

  // Redirect
  useEffect(() => {
    if (isUpdated) {
      navigate(-1);
    }
  }, [isUpdated, navigate]);

  return (
    <div className='h-96 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        {/* Form start here */}
        <form
          onSubmit={formik.handleSubmit}
          className='mt-1 flex max-w-sm m-auto'
        >
          {/* Description */}
          <textarea
            onBlur={formik.handleBlur}
            value={formik.values.description}
            onChange={formik.handleChange}
            name='description'
            id='text'
            className='shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 rounded-md'
            placeholder='Add New comment'
          />
          {/* submit btn */}
          <button
            type='submit'
            className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Submit
          </button>
        </form>

        {formik.touched.description && formik.errors.description && (
          <div className='text-red-400 mb-2 mt-2'>
            {formik.errors.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateComment;
