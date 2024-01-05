/**
 * Functional component for rendering a form to update a post.
 * Uses React hooks such as 'useDispatch', 'useSelector', 'useNavigate', and 'useParams' to interact with Redux and handle routing.
 * Utilizes the 'useFormik' hook for form validation and management.
 * Fetches the post details from the Redux store and populates the form fields with the initial values.
 * Dispatches an action to update the post and redirects to the post list page if the update is successful.
 *
 * Example Usage:
 * <UpdatePost />
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import CategoryDropdown from '../Categories/CategoryDropdown';
import {
  fetchPostDetailsAction,
  updatePostAction
} from '../../redux/slices/posts/postSlice';

// Validation schema
const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Category is required')
});

const UpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  // Select postData from store
  const postData = useSelector((state) => state.post);
  const { postDetails } = postData;

  // Select updated post from store
  const postUpdate = useSelector((state) => state.post);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title || '',
      description: postDetails?.description || '',
      category: ''
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        id
      };
      dispatch(updatePostAction(data));
    },
    validationSchema: formSchema
  });

  // Redirect
  if (isUpdated) {
    navigate(`/posts`);
  }

  return (
    <>
      <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
            Edit <span className='text-green-300'>{postDetails?.title}</span> ?
          </h2>
          {appErr || serverErr ? (
            <h1 className='text-red-500 text-xl text-center'>
              {serverErr} {appErr}
            </h1>
          ) : null}
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              {/* Title Input */}
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <div className='mt-1'>
                  <input
                    id='title'
                    name='title'
                    type='title'
                    autoComplete='title'
                    onBlur={formik.handleBlur('title')}
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                <div className='text-red-500'>
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>

              {/* Category Dropdown */}
              <CategoryDropdown
                value={formik.values.category?.categoryTitle}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />

              {/* Description Textarea */}
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  rows='5'
                  cols='10'
                  onBlur={formik.handleBlur('description')}
                  value={formik.values.description}
                  onChange={formik.handleChange('description')}
                  className='rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none'
                  type='text'
                ></textarea>
                <div className='text-red-500'>
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              {/* Update Button */}
              <div>
                {loading ? (
                  <button
                    disabled
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
