export function App() {
  return (
    <div class='text-white bg-black w-full h-full'>
      <nav class='sticky top-0 pt-4'>
        <div class='absolute right-0 mr-8 sm:mr-12 lg:mr-16'>
          <div class='flex space-x-4'>
            <a
              href='https://discord.gg/fERY6AenEv'
              target='_blank'
              class='hover:bg-indigo-600 transition ease-in-out rounded-lg block w-auto px-3 py-2'
            >
              <img src='../assets/discord.png' height='32' width='32' alt='Discord' />
            </a>

            <a
              href='https://github.com/RealShadowNova'
              target='_blank'
              class='hover:shadow-xl hover:bg-indigo-600 transition ease-in-out rounded-lg block w-auto px-3 py-2'
            >
              <img src='../assets/github.png' alt='GitHub' />
            </a>
          </div>
        </div>
      </nav>

      <div class='container min-h-screen p-12 sm:p-24 lg:p-32'>
        <div class='space-y-8'>
          <div class='space-y-4'>
            <div class='text-xl font-mono text-indigo-500'>Hi, my name is</div>
            <div class='text-6xl text-slate-200'>Hezekiah Hendry.</div>
            <div class='text-6xl text-slate-400'>I build things for the web and beyond.</div>
          </div>

          <div class='text-xl text-slate-400 max-w-2xl'>
            I'm a backend developer specializing in building (and occasionally designing) amazing projects. Currently, I'm focused on building
            something to fill this space in.
          </div>
        </div>
      </div>

      <div class='flex justify-center p-4 sm:p-8 lg:p-12'>
        <div class='font-mono text-md text-slate-500'>
          <div>Designed & Built by Hezekiah Hendry</div>
        </div>
      </div>
    </div>
  );
}
