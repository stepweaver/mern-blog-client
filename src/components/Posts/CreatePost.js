/**
 * React functional component that renders a form for creating a post.
 * Uses the useFormik hook from the Formik library to handle form state and validation.
 * Includes input fields for the post title, description, and category, as well as a dropzone for uploading an image.
 * Dispatches an action to create a new post using Redux when the form is submitted.
 * If the post creation is successful, the user is redirected to the posts page.
 *
 * Example Usage:
 * import CreatePost from './CreatePost';
 *
 * function App() {
 *   return (
 *     <div>
 *       <CreatePost />
 *     </div>
 *   );
 * }
 */
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { createPostAction } from '../../redux/slices/posts/postSlice';
import CategoryDropdown from '../Categories/CategoryDropdown';

// Form Schema
const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Select a category'),
  image: Yup.string().required('Image is required')
});

// Dropzone CSS
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: red;
  transition: border 0.24s ease-in-out;
`;

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select store data
  const post = useSelector((state) => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;

  // formik
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: ''
    },
    onSubmit: (values) => {
      // Dispatch the action
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image
      };
      dispatch(createPostAction(data));
    },
    validationSchema: formSchema
  });

  // Redirect
  useEffect(() => {
    if (isCreated) {
      navigate(`/posts`);
    }
  }, [isCreated]);

  return (
    <>
      <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
            Create Post
          </h2>

          <div className='mt-2 text-center text-sm text-gray-600'>
            <p className='font-medium text-green-600 hover:text-indigo-500'>
              Share your ideas to the world. Your post must be free from
              profanity.
            </p>
          </div>

          {appErr || serverErr ? (
            <div className='mt-2 text-center text-gray-600'>
              <p className='text-lg text-red-600'>
                {serverErr} {appErr}
              </p>
            </div>
          ) : null}
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <div className='mt-1'>
                  {/* Title */}
                  <input
                    placeholder='Enter Category'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id='title'
                    name='title'
                    type='title'
                    autoComplete='title'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2'
                  />
                </div>
                {/* Err msg */}
                <div className='text-red-500'>
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              {/* Category input goes here */}
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mt-2'
              >
                Category
              </label>
              <CategoryDropdown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mt-2'
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows='5'
                  cols='10'
                  className='rounded-lg appearance-none block w-full py-3 px-3 text-base text-gray-600 bg-transparent focus:bg-transparent border focus:border-gray-500 focus:outline-none whitespace-pre-line'
                  type='text'
                ></textarea>
                {/* Err msg */}
                <div className='text-red-500'>
                  {formik?.touched?.description && formik?.errors?.description}
                </div>
                {/* Image Component */}
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mt-3 mb-1'
                >
                  Upload post image
                </label>
                <Container className='container bg-gray-600'>
                  <Dropzone
                    onBlur={formik.handleBlur('image')}
                    Accept='image/jpeg, image/jpg, image/png'
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue('image', acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className='container'>
                        <div
                          {...getRootProps({
                            className: 'dropzone',
                            onDrop: (event) => event.stopPropagation()
                          })}
                        >
                          <input {...getInputProps()} />
                          {formik.values.image ? (
                            <img
                              src={URL.createObjectURL(formik.values.image)}
                              alt='Preview'
                              className='max-w-full h-auto'
                            />
                          ) : (
                            <p className='text-gray-300 text-lg cursor-pointer hover:text-gray-500'>
                              Click to upload image
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
