/**
 * React functional component that renders a form for adding a comment.
 *
 * @param {Object} props - The component props.
 * @param {number} props.postId - The ID of the post to which the comment will be added.
 * @returns {JSX.Element} The rendered form for adding a comment.
 */
//FIXME: Not getting appErr in state.
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { createCommentAction } from '../../redux/slices/comments/commentSlices';

const formSchema = Yup.object({
  description: Yup.string().required('Description is required')
});

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment);
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    onSubmit: (values) => {
      const data = {
        postId,
        description: values?.description
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Error handling */}
      {serverErr || appErr ? (
        <h2 className='text-red-500 text-xl pb-2'>
          {serverErr} {appErr}
        </h2>
      ) : null}
      <form
        onSubmit={formik.handleSubmit}
        className='mt-1 flex max-w-sm m-auto'
      >
        <input
          {...formik.getFieldProps('description')}
          type='text'
          id='text'
          className='shadow-sm focus:ring-blue-500  mr-2 focus:border-blue-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md'
          placeholder='Add a new comment'
        />
        {loading ? (
          <button
            disabled
            className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600'
          >
            Loading...
          </button>
        ) : (
          <button
            type='submit'
            className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Submit
          </button>
        )}
      </form>

      {formik.touched.description && formik.errors.description && (
        <div className='text-red-400 mb-2 mt-2'>
          {formik.errors.description}
        </div>
      )}
    </div>
  );
};

export default AddComment;
