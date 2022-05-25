export function App() {
  return (
    <div class='text-white'>
      <nav class='sticky top-0 bg-black shadow-md font-mono'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div class='relative flex items-center justify-between h-16'>
            <div class='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div class='flex-shrink-0 flex items-center'>
                <div class='text-indigo-500 px-3 py-2 text-2xl'>RealShadowNova</div>
              </div>
            </div>

            <div class='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div class='ml-3 relative'>
                <div class='hidden sm:block sm:ml-6'>
                  <div class='flex space-x-4'>
                    <a href='https://discord.gg/fERY6AenEv' target='_blank' class='hover:text-indigo-500 block w-auto px-3 py-2 text-base'>
                      Discord
                    </a>

                    <a href='https://github.com/RealShadowNova' target='_blank' class='hover:text-indigo-500 block w-auto px-3 py-2 text-base'>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
