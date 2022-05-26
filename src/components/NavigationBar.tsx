import { createSignal, Show } from 'solid-js';

export function NavigationBar() {
  const [open, setOpen] = createSignal(false);

  return (
    <nav class='sticky top-0 bg-black shadow-md text-white'>
      <div class='mx-auto px-4 sm:px-6 lg:px-8'>
        <div class='relative flex items-center justify-between h-24'>
          <div class='absolute sm:hidden inset-y-0 left-0 items-center'>
            <button
              type='button'
              onClick={() => setOpen(!open())}
              class='inline-flex items-center justify-start p-4 m-4 rounded-md text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-inset focus:ring-white'
            >
              <Show
                when={open()}
                fallback={
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                }
              >
                <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </Show>
            </button>
          </div>

          <div class='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div class='flex-shrink-0 flex items-center space-x-2'>
              <img class='block h-8 w-auto rounded-full' src='/assets/realshadownova.png' />
              <h4 class='font-mono font-bold text-lg'>RealShadowNova</h4>
            </div>
          </div>

          <div class='absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto'>
            <div class='relative'>
              <div class='hidden sm:block'>
                <div class='flex space-x-4'>
                  <a class='hover:text-indigo-500 transition ease-in-out block mx-auto p-2 font-mono font-bold text-lg' href='#'>
                    Home
                  </a>
                  <a class='hover:text-indigo-500 transition ease-in-out block mx-auto p-2 font-mono font-bold text-lg' href='#about'>
                    About
                  </a>

                  <a
                    class='hover:bg-indigo-600 transition ease-in-out rounded-lg block mx-auto p-2'
                    href='https://discord.gg/fERY6AenEv'
                    target='_blank'
                  >
                    <img class='block h-8 w-auto' src='/assets/discord.png' alt='Discord' />
                  </a>

                  <a
                    class='hover:bg-indigo-600 transition ease-in-out rounded-lg block mx-auto p-2'
                    href='https://github.com/RealShadowNova'
                    target='_blank'
                  >
                    <img class='block h-8 w-auto' src='/assets/github.png' alt='GitHub' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Show when={open()}>
        <div class='sm:hidden text-center'>
          <div class='p-2 space-y-2'>
            <a class='hover:bg-indigo-600 transition ease-in-out block font-mono font-bold text-lg' href='#'>
              Home
            </a>

            <a class='hover:bg-indigo-600 transition ease-in-out block font-mono font-bold text-lg ' href='#'>
              About
            </a>
          </div>
        </div>
      </Show>
    </nav>
  );
}
