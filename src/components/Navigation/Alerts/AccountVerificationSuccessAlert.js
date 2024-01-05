/**
 * Renders an account verification success alert.
 *
 * @returns {JSX.Element} The account verification success alert component.
 */
import { CheckCircleIcon } from '@heroicons/react/solid';

export default function AccountVerificationSuccessAlert() {
  return (
    <section className='rounded-md bg-green-50 p-2'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <CheckCircleIcon
            className='h-5 w-5 text-green-500'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium text-green-600'>
            Huzzah! Click the link in your email to verify your account. The
            link will expire in 10 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
