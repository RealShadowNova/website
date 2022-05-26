import { Footer } from './components/Footer';
import { NavigationBar } from './components/NavigationBar';

export function App() {
  return (
    <div class='bg-black text-white space-y-24'>
      <NavigationBar />

      <div class='flex justify-center'>
        <div class='max-w-4xl space-y-8 p-8'>
          <div class='space-y-4'>
            <h3 class='text-base sm:text-xl font-mono text-indigo-500'>Hi, my name is</h3>
            <h1 class='text-4xl sm:text-6xl'>Hezekiah Hendry.</h1>
            <h1 class='text-4xl sm:text-6xl'>I build things for the web and beyond.</h1>
          </div>

          <p class='text-base sm:text-xl'>
            I'm a back-end developer specializing in building (and occasionally designing) amazing projects. Currently, I'm focused on building
            something to fill this space in.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
