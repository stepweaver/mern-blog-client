/**
 * Renders a section on the homepage with a title, description, and an image.
 * Conditionally renders a button based on the user's authentication status.
 *
 * @returns {JSX.Element} The rendered section with a title, description, and an image.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import poster from '../../img/poster.png';

const HomePage = () => {
  const { userAuth } = useSelector((state) => state.users);

  return (
    <section className='pb-10 bg-gradient-to-br from-gray-950 via-gray-700 via-35% to-orange-500 min-h-screen'>
      <div className='relative container px-4 mx-auto'>
        <div className='flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14'>
          <div className='w-full lg:w-1/2 px-4 mb-16 lg:mb-0'>
            <h2 className='max-w-2xl mt-12 mb-12 text-6xl 2xl:text-6xl text-white font-bold font-heading'>
              <div>Stephen Weaver</div>
              <div className='mt-4 text-4xl text-yellow-500'>
                Full Stack Web Developer
              </div>
            </h2>
            <p className='mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100'>
              Welcome to my corner of the web! Join me as I navigate the
              intricacies of coding. This blog is not just about showcasing
              skills but sharing the authentic experience of growth and
              overcoming challenges. Explore ongoing projects that reflect my
              passion and commitment to pushing the boundaries of web
              development. Dive into discussions around coding and development,
              fostering a community of learners and enthusiasts.
            </p>
            {userAuth?._id ? (
              <a
              className='inline-block px-12 py-5 text-lg text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200 hover:origin-top transform hover:-translate-y-1 hover:scale-110'
                href='/'
              >
                Create a post
              </a>
            ) : (
              <a
              className='inline-block px-12 py-5 text-lg text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200 hover:origin-top transform hover:-translate-y-1 hover:scale-110'
                href='/register'
              >
                Create an account
              </a>
            )}
          </div>
          <div className='w-full lg:w-1/2 px-4'>
            <img className='w-full mt-5' src={poster} alt='Poster Image' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
