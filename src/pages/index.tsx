import { Link } from '@solidjs/router';
import { VsLinkExternal } from 'solid-icons/vs';
import type { Component } from 'solid-js';

const Home: Component = () => {
  return (
    <div class='mx-auto flex max-w-6xl flex-col place-items-center py-16 px-8 lg:mt-[calc(100vh-70vh)] lg:place-content-center lg:py-0 lg:px-6'>
      <div class='flex flex-col place-items-center lg:flex-row'>
        <div class='flex max-w-lg flex-col gap-3'>
          <h1 class='text-3xl font-black leading-tight sm:text-5xl sm:leading-tight'>
            Hello, my name is <span class='text-gradient'>Hezekiah Hendry</span>
          </h1>

          <p class='my-6 leading-normal text-neutral-300'>
            I'm a back-end developer specializing in build and occasionally designing amazing projects. I am proficient in a variety of programming
            languages and frameworks, including{' '}
            <a class='text-nodejs' href='https://nodejs.org' target='_blank'>
              Node.js
            </a>
            ,{' '}
            <a class='text-typescript' href='https://typescriptlang.org' target='_blank'>
              TypeScript
            </a>
            , and{' '}
            <a class='text-solid-js' href='https://solidjs.com' target='_blank'>
              Solid.js
            </a>
            .
          </p>

          <div class='flex flex-row gap-4 font-semibold'>
            <Link class='bg-gradient flex h-11 place-items-center rounded px-6 focus:ring-2 focus:ring-white' href='/docs'>
              Docs
            </Link>

            <a
              class='bg-dark-500 border-dark-100 hover:bg-dark-300 flex h-11 place-items-center gap-1 rounded border px-4 focus:ring-2 focus:ring-violet-500'
              href='https://github.com/RealShadowNova'
              target='_blank'
            >
              <span>GitHub </span>
              <VsLinkExternal class='h-5 w-auto text-neutral-300' />
            </a>

            <a
              class='bg-dark-500 border-dark-100 hover:bg-dark-300 flex h-11  place-items-center gap-1 rounded border px-4 focus:ring-2 focus:ring-violet-500'
              href='https://discord.gg/fERY6AenEv'
              target='_blank'
            >
              <span>Discord </span>
              <VsLinkExternal class='h-5 w-auto text-neutral-300' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
