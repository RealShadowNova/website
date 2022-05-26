import { Footer } from './components/Footer';
import { NavigationBar } from './components/NavigationBar';

export function App() {
  return (
    <div class='bg-black text-white space-y-24'>
      <NavigationBar />

      <div class='flex justify-center'>
        <div class='max-w-4xl space-y-8 px-8'>
          <div class='space-y-4'>
            <div class='text-base sm:text-xl font-mono text-indigo-500'>Hi, my name is</div>
            <div class='text-4xl sm:text-6xl'>Hezekiah Hendry.</div>
            <div class='text-4xl sm:text-6xl'>I build things for the web and beyond.</div>
          </div>

          <div class='text-base sm:text-xl'>
            I'm a backend developer specializing in building (and occasionally designing) amazing projects. Currently, I'm focused on building
            something to fill this space in.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
