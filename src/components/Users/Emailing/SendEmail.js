/**
 * SendEmail component for sending an email.
 *
 * This component is a functional component in React that handles sending an email. It uses the useFormik hook to manage form state and validation, and the useSelector hook to access data from the Redux store. It dispatches an action called sendMailAction when the form is submitted, and redirects the user after the email is sent.
 *
 * Inputs:
 * - dispatch: A function from the Redux library that is used to dispatch actions to the Redux store.
 * - navigate: A function from the react-router-dom library that is used to navigate to different routes.
 * - location: An object from the react-router-dom library that contains information about the current URL.
 * - email: A string that represents the recipient's email address.
 *
 * Outputs:
 * - JSX code for rendering the email form.
 */
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { sendMailAction } from '../../../redux/slices/email/emailSlices';

// Form Schema
const formSchema = Yup.object({
  recipientEmail: Yup.string().required('Recipient email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

//-------------------------------
// Send Message
//-------------------------------
const SendEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  // formik
  const formik = useFormik({
    initialValues: {
      recipientEmail: email,
      subject: '',
      message: ''
    },
    onSubmit: (values) => {
      // dispatch the action
      dispatch(sendMailAction(values));
    },
    validationSchema: formSchema
  });

  // Select date from store
  const sendMail = useSelector((state) => state?.sendMail);
  const { loading, appErr, serverErr, isMailSent } = sendMail;

  // Redirect
  useEffect(() => {
    if (isMailSent) {
      navigate(-1);
    }
  });

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
          Send Message
          {/* Email title */}
          <span className='text-green-300'>email title</span>
        </h2>

        <p className='mt-2 text-center text-xl text-red-600'>
          {serverErr || appErr ? (
            <h2>
              {serverErr} {appErr}
            </h2>
          ) : null}
        </p>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {/* {emailSent && <div>Sent</div>} */}
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Recipient Email
              </label>
              {/* Email message */}
              <div className='mt-1'>
                <input
                  value={formik.values.recipientEmail}
                  onChange={formik.handleChange('recipientEmail')}
                  onBlur={formik.handleBlur('recipientEmail')}
                  disabled
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              {/* Err msg */}
              <div className='text-red-500'>
                {formik.touched.recipientEmail && formik.errors.recipientEmail}
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Subject
              </label>
              <div className='mt-1'>
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange('subject')}
                  onBlur={formik.handleBlur('subject')}
                  id='subject'
                  name='subject'
                  type='text'
                  autoComplete='subject'
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              {/* err msg */}
              <div className='text-red-500'>
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                rows='5'
                cols='10'
                className='rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none'
                type='text'
              ></textarea>
              {/* err here */}
              <div className='text-red-500'>
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
              {loading ? (
                <button
                  disabled
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600'
                >
                  Loading...
                </button>
              ) : (
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
