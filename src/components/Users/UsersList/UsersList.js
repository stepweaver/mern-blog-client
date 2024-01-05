/**
 * Renders a list of users fetched from the Redux store.
 * Displays loading message, error message, or no users found message if necessary.
 *
 * @returns {JSX.Element} The rendered UsersList component.
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersListHeader from './UsersListHeader';
import UsersListItem from './UsersListItem';
import { fetchUsersAction } from '../../../redux/slices/users/usersSlices';
import LoadingComponent from '../../../utils/LoadingComponent';

const UsersList = () => {
  const dispatch = useDispatch();
  const { usersList, appErr, serverErr, loading, blocked, unblocked } = useSelector(
    (state) => state?.users
  );

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch, blocked, unblocked]);

  return (
    <section className='py-8 bg-gray-900 min-h-screen'>
      <UsersListHeader />
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <p className='mt-2 text-yellow-600 text-center text-lg'>
          {serverErr} {appErr}
        </p>
      ) : usersList?.length <= 0 ? (
        <p>No users found</p>
      ) : (
        usersList?.map((user) => <UsersListItem key={user.id} user={user} />)
      )}
    </section>
  );
};

export default UsersList;
