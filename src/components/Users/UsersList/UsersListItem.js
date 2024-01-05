/**
 * Renders a list item for a user with their profile information and various action buttons.
 *
 * @param {Object} user - An object containing the user's information.
 * @param {string} user.profilePhoto - The URL of the user's profile photo.
 * @param {string} user.firstName - The user's first name.
 * @param {string} user.lastName - The user's last name.
 * @param {string} user.email - The user's email address.
 * @param {string} user.accountType - The user's account type.
 * @param {boolean} user.isBlocked - Indicates if the user is blocked.
 * @param {Array} user.followers - An array of the user's followers.
 * @param {Array} user.posts - An array of the user's posts.
 * @returns {JSX.Element} - Rendered HTML for a user list item.
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';

import {
  blockUserAction,
  unblockUserAction
} from '../../../redux/slices/users/usersSlices';

const UsersListItem = ({
  user: {
    profilePhoto,
    firstName,
    lastName,
    email,
    accountType,
    isBlocked,
    followers,
    posts,
    _id
  }
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendMailNavigate = () => {
    navigate('/send-email', {
      state: { email, id: _id }
    });
  };

  return (
    <>
      <div className='p-8 mb-4 bg-white shadow rounded'>
        <div className='flex flex-wrap items-center -mx-4'>
          <div className='w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0'>
            <img
              className='w-10 h-10 mr-4 object-cover rounded-full'
              src={profilePhoto}
              alt='profile '
            />
            <div>
              <p className='text-sm font-medium'>
                {firstName} {lastName}
              </p>
              <p className='text-xs text-gray-500'>{email}</p>
            </div>
          </div>
          <div className='w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0'>
            {isBlocked ? (
              <p className='py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full'>
                {accountType}
                <span>Blocked</span>
              </p>
            ) : (
              <p className='py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full'>
                {accountType}
              </p>
            )}
          </div>
          <div className='w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0'>
            <p className='text-sm font-medium'>
              <span className='text-base mr-2  text-bold text-yellow-500'>
                {followers.length}
              </span>
              followers
            </p>
          </div>
          <div className='w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0'>
            <p className='inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded'>
              <span className='text-base mr-2  boder-2 text-bold text-yellow-500'>
                {posts.length} - Posts
              </span>
            </p>
            <button
              onClick={() => navigate(`/profile/${_id}`)}
              className=' text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-500 rounded hover:bg-green-600 hover:text-white'
            >
              Profile
            </button>

            {isBlocked ? (
              <button
                onClick={() => dispatch(unblockUserAction(_id))}
                className='inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded'
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(_id))}
                className='inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded'
              >
                Block
              </button>
            )}

            <button
              onClick={sendMailNavigate}
              className='inline-flex  justify-center bg-green-700 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
            >
              <MailIcon
                className='-ml-1 mr-2 h-5 w-5 text-gray-200'
                aria-hidden='true'
              />
              <span className='text-base mr-2  text-bold text-yellow-500'>
                Message
              </span>
            </button>
          </div>
          <div className='w-full lg:w-1/12 px-4'>
            <div className='flex items-center'>
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;