/**
 * React functional component that renders a form for adding a new category.
 * Uses Formik for form management and Yup for form validation.
 * Dispatches an action to create a new category using Redux when the form is submitted.
 * If the category is successfully created, the form is reset and the user is redirected to the category list page.
 *
 * @component
 * @example
 * import AddNewCategory from './AddNewCategory';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <AddNewCategory />
 *     </div>
 *   );
 * };
 */
//FIXME: Why can't I reload Add Category page after adding a new category?
import { useEffect } from 'react';
import { BookOpenIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { createCategoryAction } from '../../redux/slices/category/categorySlice';

// Form Schema
const formSchema = Yup.object({
  title: Yup.string().required('Enter a category')
});

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Formik
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: (values, { resetForm }) => {
      // Dispatch the action
      dispatch(createCategoryAction(values));
      // Reset the form
      resetForm();
    },
    validationSchema: formSchema
  });

  // Get data from store
  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, isCreated } = state;

  // Redirect to category list page
  useEffect(() => {
    if (isCreated) {
      // Reset the form
      formik.resetForm();
      // Navigate to the category list
      navigate('/category-list');
    }
  }, [isCreated, navigate, formik]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <BookOpenIcon className='mx-auto h-12 w-auto' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Add New Category
          </h2>
          <div className='mt-2 text-center text-sm text-gray-600'>
            <p className='font-medium text-indigo-600 hover:text-indigo-500'>
              These are the categories users will select when creating a post
            </p>
            {/* Display error message */}
            <div>
              {appErr || serverErr ? (
                <h2 className='text-red-500 text-center text-lg'>
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div>
          </div>
        </div>
        {/* Form */}
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='title' className='sr-only'>
                Title
              </label>
              {/* Title */}
              <input
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                autoComplete='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm'
                placeholder='New Category'
              />
              <div className='text-red-400 mb-2'>
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600'
                >
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <PlusCircleIcon
                      className='h-5 w-5 text-yellow-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  Loading...
                </button>
              ) : (
                <button
                  type='submit'
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <PlusCircleIcon
                      className='h-5 w-5 text-yellow-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
