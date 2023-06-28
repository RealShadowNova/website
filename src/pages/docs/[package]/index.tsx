import { Link, useParams } from '@solidjs/router';
import { HiSolidArrowLeft, HiSolidArrowRight } from 'solid-icons/hi';
import { VsLayers } from 'solid-icons/vs';
import { For, createResource, type Component } from 'solid-js';

const SelectPackageVersion: Component = () => {
  const params = useParams();
  const [versions] = createResource(async () => {
    const packages = (await import('../../../assets/docs/packages.json')).default as [string, string[]][] | undefined;

    if (packages === undefined) throw new Error("'assets/docs/packages.json' not found. Please run 'yarn fetch-docs' to generate the documentation.");

    for (const [name, versions] of packages) {
      if (name === params.package) {
        return versions;
      }
    }

    return [];
  });

  return (
    <div class='max-w-xs sm:max-w-md mx-auto flex h-full flex-row place-content-center place-items-center gap-8 py-0 lg:py-0 lg:px-6'>
      <div class='flex grow flex-col place-content-center gap-4'>
        <h1 class='text-4xl font-bold text-center text-gradient p-1'>Select A Version</h1>

        <For each={versions()}>
          {(version) => (
            <Link
              class='bg-dark-500 border-dark-100 hover:bg-dark-400 flex h-11 flex-col place-content-center rounded border p-4 font-semibold leading-none focus:ring-2 focus:ring-violet-500'
              href={`/docs/${params.package}/${version}`}
            >
              <div class='flex flex-row place-content-between place-items-center gap-4'>
                <div class='flex flex-row place-content-between place-items-center gap-4'>
                  <VsLayers class='h-6 w-auto text-neutral-300' />
                  <h2 class='font-semibold'>{version}</h2>
                </div>

                <HiSolidArrowRight class='h-6 w-auto text-neutral-300' />
              </div>
            </Link>
          )}
        </For>

        <Link
          class='bg-gradient flex h-11 place-items-center gap-2 place-self-center rounded px-4 font-semibold focus:ring-2 focus:ring-white'
          href='/docs'
        >
          <HiSolidArrowLeft class='h-5 w-auto' />
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
};

export default SelectPackageVersion;
