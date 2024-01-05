/**
 * React functional component for uploading a profile photo.
 *
 * This component renders a form with a Dropzone where users can upload an image file.
 * The form uses Formik for form handling and validation.
 * Redux is used for state management and the form data is dispatched to the uploadProfilePhotoAction.
 * Upon successful upload, the user is redirected to their profile page.
 *
 * Example Usage:
 * <UploadProfilePhoto />
 *
 * @returns {React.Component} The UploadProfilePhoto component.
 */
import { useEffect } from 'react';
import { UploadIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import { uploadProfilePhotoAction } from '../../../redux/slices/users/usersSlices';

// CSS for dropzone
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
  outline: none;
  transition: border 0.24s ease-in-out;
`;

// Form Schema
const formSchema = Yup.object({
  image: Yup.string().required('Image is required')
});

export default function UploadProfilePhoto() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // formik
  const formik = useFormik({
    initialValues: {
      image: ''
    },
    onSubmit: (values) => {
      dispatch(uploadProfilePhotoAction(values));
    },
    validationSchema: formSchema
  });

  // Store data
  const users = useSelector((state) => state?.users);
  const { profilePhoto, loading, appErr, serverErr, userAuth } = users;

  // Redirect
  useEffect(() => {
    if (profilePhoto) {
      navigate(`/profile/${userAuth?._id}`);
    }
  });

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
          Upload profile photo
        </h2>
        {/* Display err here */}
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            {/* Image container here thus Dropzone */}
            {appErr || serverErr ? (
              <h2 className='text-center text-lg text-red-500'>
                {serverErr} {appErr}
              </h2>
            ) : null}
            <Container className=''>
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
            <div className='text-red-500'>
              {formik.touched.image && formik.errors.image}
            </div>

            <div>
              {loading ? (
                <button
                  disabled
                  className='inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-500'
                >
                  <UploadIcon
                    className='-ml-1 mr-2 h-5  text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Loading...</span>
                </button>
              ) : (
                <button
                  type='submit'
                  className='inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                >
                  <UploadIcon
                    className='-ml-1 mr-2 h-5  text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Upload Photo</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
