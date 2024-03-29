/**
 * React functional component that displays a list of posts.
 * It fetches the posts and categories from the Redux store using the useSelector hook,
 * and dispatches actions to fetch the data using the useEffect hook.
 * The component renders the list of posts along with their categories, likes, unlikes, views, and author information.
 *
 * Example Usage:
 * import PostsList from './PostsList';
 *
 * function App() {
 *   return (
 *     <div>
 *       <PostsList />
 *     </div>
 *   );
 * }
 *
 * Inputs: None
 *
 * Outputs:
 * - Renders a section containing the latest posts from authors.
 * - Renders a list of categories.
 * - Renders a list of posts with their respective likes, unlikes, views, and author information.
 */
import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';
import {
  fetchPostsAction,
  toggleLikePost,
  toggleUnlikePost
} from '../../redux/slices/posts/postSlice';
import DateFormatter from '../../utils/DateFormatter';
import LoadingComponent from '../../utils/LoadingComponent';

export default function PostsList() {
  // Select post from store
  const post = useSelector((state) => state?.post);
  const { postList, loading, appErr, serverErr, likes, unLikes } = post;

  // Select category from store
  const category = useSelector((state) => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr
  } = category;

  // Dispatch Action
  const dispatch = useDispatch();

  // fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(''));
  }, [dispatch, likes, unLikes]);

  // fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className='py-20 bg-gray-900 min-h-screen radius-for-skewed'>
          <div className='container mx-auto px-4'>
            <div className='mb-16 flex flex-wrap items-center'>
              <div className='w-full lg:w-1/2'>
                <h2 className='text-4xl text-gray-300 lg:text-5xl font-bold font-heading'>
                  Latest Posts
                </h2>
              </div>
              <div className=' block text-right w-1/2'>
                {/* View All */}
                <button
                  onClick={() => dispatch(fetchPostsAction(''))}
                  className='inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-orange-600 hover:bg-orange-700 text-gray-50 font-bold leading-loose transition duration-200'
                >
                  View All Posts
                </button>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3'>
              <div className='mb-8 lg:mb-0 w-full lg:w-1/4 px-3'>
                <div className='py-4 px-6 bg-gray-600 shadow rounded'>
                  <h4 className='mb-4 text-gray-500 font-bold uppercase'>
                    Categories
                  </h4>
                  <ul>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className='text-yellow-500 text-xl'>
                        No categories found
                      </h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchPostsAction(category?.title))
                            }
                            className='block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500'
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className='w-full lg:w-3/4 px-3'>
                {/* Posts go here */}
                {appErr || serverErr ? (
                  <h1 className='text-yellow-600 text-center text-lg'>
                    {serverErr} {appErr}
                  </h1>
                ) : postList?.length <= 0 ? (
                  <h1 className='text-yellow-500 text-xl text-center'>
                    No posts found
                  </h1>
                ) : (
                  postList?.map((post) => (
                    <div
                      key={post._id}
                      className='flex flex-wrap bg-gray-900 -mx-3 lg:mb-6'
                    >
                      <div className='mb-10  w-full lg:w-1/4'>
                        {/* Post image */}
                        <Link to={`/posts/${post?._id}`}>
                          <img
                            className='w-full h-full object-cover rounded'
                            src={post?.image}
                            alt=''
                          />
                        </Link>
                        {/* Likes, views unlikes */}
                        <div className='flex flex-row bg-gray-300 justify-center w-full  items-center '>
                          {/* Likes */}
                          <div className='flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1'>
                            {/* Toggle like  */}
                            <div className=''>
                              <ThumbUpIcon
                                onClick={() =>
                                  dispatch(toggleLikePost(post?._id))
                                }
                                className='h-7 w-7 text-indigo-600 cursor-pointer'
                              />
                            </div>
                            <div className='pl-2 text-gray-600'>
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Unlikes */}
                          <div className='flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1'>
                            <div>
                              <ThumbDownIcon
                                onClick={() =>
                                  dispatch(toggleUnlikePost(post?._id))
                                }
                                className='h-7 w-7 cursor-pointer text-gray-600'
                              />
                            </div>
                            <div className='pl-2 text-gray-600'>
                              {post?.unLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className='flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1'>
                            <div>
                              <EyeIcon className='h-7 w-7  text-gray-400' />
                            </div>
                            <div className='pl-2 text-gray-600'>
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full lg:w-3/4 px-3'>
                        <Link
                          to={`/posts/${post?._id}`}
                          className='hover:underline'
                        >
                          <h3 className='mb-1 text-2xl text-orange-600 hover:text-orange-500 font-bold font-heading'>
                            {post?.title}
                          </h3>
                        </Link>
                        <p className='text-gray-300'>{post?.description}</p>
                        {/* Read more */}
                        <Link
                          to={`/posts/${post?._id}`}
                          className='text-blue-600 hover:underline'
                        >
                          Read More...
                        </Link>
                        {/* User Avatar */}
                        <div className='mt-6 flex items-center'>
                          <div className='flex-shrink-0'>
                            <Link>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={post?.author?.profilePhoto}
                                alt=''
                              />
                            </Link>
                          </div>
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-900'>
                              <Link
                                to={`/profile/${post?.author?._id}`}
                                className='text-yellow-500 hover:underline '
                              >
                                {post?.author?.firstName}{' '}
                                {post?.author?.lastName}
                              </Link>
                            </p>
                            <div className='flex space-x-1 text-sm text-orange-500'>
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-900'>
          <div className='skew bg-orange-600 skew-bottom mr-for-radius'>
            <svg
              className='h-8 md:h-12 lg:h-10 w-full text-gray-900'
              viewBox='0 0 10 10'
              preserveAspectRatio='none'
            >
              <polygon fill='currentColor' points='0 0 10 0 0 10'></polygon>
            </svg>
          </div>
          <div className='skew bg-gray-500  skew-bottom ml-for-radius'>
            <svg
              className='h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900'
              viewBox='0 0 10 10'
              preserveAspectRatio='none'
            >
              <polygon fill='currentColor' points='0 0 10 0 10 10'></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
