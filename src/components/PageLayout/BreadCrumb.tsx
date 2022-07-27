import { Link, useLocation } from '@solidjs/router';
import { For, type Component } from 'solid-js';

export const BreadCrumb: Component = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <For each={pathnames}>
      {(item, index) => (
        <>
          <div class='mx-2 select-none'>/</div>
          <Link href={`/${pathnames.slice(0, index() + 1).join('/')}`} class='hover:underline rounded px-1 focus:ring-2 focus:ring-violet-500'>
            {item}
          </Link>
        </>
      )}
    </For>
  );
};
