import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LockClosedIcon } from '@heroicons/react/solid';
import { passwordResetTokenAction } from '../../../redux/slices/users/usersSlices';

// Form Schema
const formSchema = Yup.object({
  email: Yup.string().required('Email is required')
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // formik
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values) => {
      // dispatch the action
      dispatch(passwordResetTokenAction(values?.email));
    },
    validationSchema: formSchema
  });

  // Store data
  const users = useSelector((state) => state?.users);
  const { passwordToken, loading, appErr, serverErr } = users;

  // Redirect
  useEffect(() => {
    if (passwordToken) {
      toast.success('A password reset link has been sent to your email.');
      navigate(`/login`);
    }
  }, [passwordToken, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-50'>
            Password Reset Form
          </h2>
          <div className='mt-2 text-center text-sm text-gray-600'>
            <p className='font-medium text-blue-500'>Enter account email</p>
          </div>
        </div>
        {/* Err msg */}
        <div className='text-center text-2xl text-red-500'>
          {serverErr || appErr ? (
            <h3>
              {serverErr}! {appErr}.
            </h3>
          ) : null}
        </div>
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Enter Your Email Address
              </label>
              <input
                type='email'
                autoComplete='email'
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
              {/* Err msg */}
              <div className='text-red-500 mb-2'>
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <button
                disabled
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                    aria-hidden='true'
                  />
                </span>
                Loading...
              </button>
            ) : (
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                    aria-hidden='true'
                  />
                </span>
                Reset Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
