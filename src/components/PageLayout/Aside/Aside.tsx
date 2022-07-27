import type { ParentComponent } from 'solid-js';

export const Aside: ParentComponent = (props) => (
  <aside class='bg-dark-600 border-dark-100 fixed top-20 right-0 bottom-0 z-10 hidden h-[calc(100vh-72px)] w-64 border-l pr-2 xl:block'>
    <div class='relative overflow-hidden w-full h-full'>
      <div class='absolute inset-0 overflow-auto -mr-4 -mb-4'>
        <div class='flex flex-col gap-4 p-3 pb-8 ml-2'>{props.children}</div>
      </div>
    </div>
  </aside>
);
