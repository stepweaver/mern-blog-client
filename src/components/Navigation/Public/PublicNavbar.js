import React from 'react';
import { useSelector } from 'react-redux';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  MenuIcon,
  XIcon,
  LoginIcon,
  BookOpenIcon
} from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Posts', href: '/posts', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PublicNavbar = () => {
  const userAuth = useSelector((state) => state.userAuth);

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex space-x-4'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex-shrink-0 flex items-center'>
                  {/* Logo */}
                  <BookOpenIcon className='h-10 w-10 text-gray-50' />
                </div>
                <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <Link
                    to='/login'
                    type='button'
                    className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'
                  >
                    <LoginIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;
