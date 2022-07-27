import { Link } from '@solidjs/router';
import { HiSolidArrowLeft, HiSolidArrowRight } from 'solid-icons/hi';
import { VsPackage } from 'solid-icons/vs';
import { For, createResource, type Component } from 'solid-js';

const SelectPackage: Component = () => {
  const [packages] = createResource(async () => {
    const packages = (await import('../../assets/docs/packages.json')).default as [string, string[]][] | undefined;

    if (packages === undefined) throw new Error("'assets/docs/packages.json' not found. Please run 'yarn fetch-docs' to generate the documentation.");

    return packages ?? [];
  });

  return (
    <div class='max-w-sm sm:max-w-md mx-auto flex h-full flex-row place-content-center place-items-center gap-8 py-0 lg:py-0 lg:px-6'>
      <div class='flex grow flex-col place-content-center gap-4'>
        <h1 class='text-4xl font-bold text-center text-gradient p-1'>Select A Package</h1>

        <For each={packages()}>
          {([name, versions]) => (
            <Link
              class='bg-dark-500 border-dark-100 hover:bg-dark-400 flex h-11 place-content-between rounded border px-2 font-semibold leading-none focus:ring-2 focus:ring-violet-500'
              href={`/docs/${name}/${versions[versions.length - 1] ?? versions[0]}`}
            >
              <div class='flex grow flex-row place-content-between place-items-center gap-2'>
                <div class='flex grow flex-row place-content-between place-items-center'>
                  <div class='flex flex-row place-content-between place-items-center gap-2'>
                    <VsPackage class='h-6 w-auto text-neutral-300' />
                    <h2 class='font-semibold'>{name}</h2>
                  </div>

                  <Link
                    class='bg-gradient flex h-6 place-content-center place-items-center rounded px-2 text-xs font-semibold focus:ring-2 focus:ring-white'
                    href={`/docs/${name}`}
                  >
                    Select Version
                  </Link>
                </div>

                <HiSolidArrowRight class='h-6 w-auto text-neutral-300' />
              </div>
            </Link>
          )}
        </For>

        <Link
          class='bg-gradient flex h-11 place-items-center gap-1 place-self-center rounded px-4 font-semibold focus:ring-2 focus:ring-white'
          href='/'
        >
          <HiSolidArrowLeft class='h-5 w-auto' />
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
};

export default SelectPackage;
