/**
 * Renders an alert warning for an unverified account.
 * Includes an exclamation icon and a button to send a verification token.
 *
 * @example
 * ```javascript
 * <AccountVerificationAlertWarning />
 * ```
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
import { ExclamationIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';

import { accountVerificationSendTokenAction } from '../../../redux/slices/accountVerification/accountVerificationSlice';

export default function AccountVerificationAlertWarning() {
  const dispatch = useDispatch();

  return (
    <div className='bg-red-500 border-l-4 border-yellow-400 p-2'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <ExclamationIcon
            className='h-5 w-5 text-yellow-500'
            aria-label='Account not verified'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <p className='text-sm text-yellow-200'>
            Your account is not verified.{' '}
            <button
              onClick={() => dispatch(accountVerificationSendTokenAction())}
              className='font-medium underline text-green-200 hover:text-yellow-600'
            >
              Click here to verify your account.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
