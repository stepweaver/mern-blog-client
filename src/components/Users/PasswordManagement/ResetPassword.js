import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LockClosedIcon } from '@heroicons/react/solid';
import { passwordResetAction, updatePasswordAction } from '../../../redux/slices/users/usersSlices';

// Form Schema
const formSchema = Yup.object({
  password: Yup.string().required('Password is required')
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const resetToken = params?.resetToken;

  console.log(params);

  // formik
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: (values) => {
      if (values?.password && resetToken) {
        // dispatch the action
        dispatch(passwordResetAction({ password: values?.password, resetToken: resetToken }));
      } else {
        console.error('Password or reset token is undefined');
      }
    },
    validationSchema: formSchema
  });

  // Store data
  const users = useSelector((state) => state?.users);
  const { passwordReset, loading, serverErr, appErr } = users;

  // Redirect
  useEffect(() => {
    if (passwordReset) {
      toast.success('Password updated successfully');
      navigate(`/login`);
    }
  }, [passwordReset, navigate]);

  //TODO: Send email to verify password has been reset.

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Password Reset
          </h2>
          <div className='mt-2 text-center text-sm text-gray-600'>
            <p className='font-medium text-indigo-600 hover:text-indigo-500'>
              Enter a new password
            </p>
          </div>
        </div>
        {/* Err msg */}
        <div className='text-red-500 text-center'>
          {appErr || serverErr ? (
            <h3>
              {serverErr} {appErr}
            </h3>
          ) : null}
        </div>
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Enter Your New Password
              </label>
              <input
                type='password'
                autoComplete='password'
                value={formik.values.password}
                onChange={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Enter new Password'
              />
              {/* Err msg */}
              <div className='text-red-400 mb-2'>
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between'></div>

          <div>
            {loading ? (
              <button
                disabled
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 '
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
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
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
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

export default ResetPassword;
