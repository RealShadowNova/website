import { Link } from '@solidjs/router';
import { VsHome } from 'solid-icons/vs';
import type { Component } from 'solid-js';

const NotFound: Component = () => {
  return (
    <div class='mx-auto flex max-w-6xl flex-col place-items-center gap-12 py-16 px-8 lg:mt-72 lg:place-content-center lg:py-0 lg:px-6'>
      <div class='flex flex-col place-items-center gap-10 lg:flex-row lg:gap-6'>
        <div class='flex max-w-lg flex-col gap-3 text-center'>
          <h1 class='text-3xl font-black leading-tight sm:text-5xl sm:leading-tight'>404 - Page not found</h1>

          <p class='my-6 leading-normal text-neutral-300'>The page you are looking for does not exist. Please check the URL and try again.</p>

          <Link
            class='bg-gradient flex h-11 place-items-center gap-2 place-self-center rounded px-4 text-lg font-semibold focus:ring-2 focus:ring-white'
            href='/'
          >
            <VsHome class='h-6 w-auto' />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
