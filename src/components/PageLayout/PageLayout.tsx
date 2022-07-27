import { createBreakpoints } from '@solid-primitives/media';
import { Link, NavLink, useLocation, useParams } from '@solidjs/router';
import {
  VsChevronDown,
  VsHome,
  VsMenu,
  VsPackage,
  VsSymbolClass,
  VsSymbolEnum,
  VsSymbolField,
  VsSymbolInterface,
  VsSymbolMethod,
  VsSymbolNamespace,
  VsSymbolVariable,
  VsVersions
} from 'solid-icons/vs';
import { For, Show, createEffect, createSignal, type Component, type JSX, type ParentComponent } from 'solid-js';
import type { ProjectParser } from 'typedoc-json-parser';
import { packagesData } from '../../resources/packagesData';
import { Spinner } from '../Spinner';
import { BreadCrumb } from './BreadCrumb';

const ButtonLink: Component<ButtonLinkProps> = (props) => {
  return (
    <Link
      class='hover:bg-dark-500 flex flex-row place-content-start place-items-center p-4 rounded gap-4 focus:ring-2 focus:ring-violet-500'
      href={props.href}
    >
      <span class='text-neutral-300'>{props.icon}</span>
      <h2 class='font-semibold'>{props.name}</h2>
    </Link>
  );
};

interface ButtonLinkProps {
  name: string;

  href: string;

  icon?: JSX.Element;
}

const Disclosure: ParentComponent<DisclosureProps> = (props) => {
  const location = useLocation();
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    if (location.pathname.startsWith(props.pathname)) setOpen(true);
  });

  return (
    <div class='flex flex-col'>
      <button
        class='hover:bg-dark-500 rounded focus:ring-2 p-4 mx-2 mb-1 focus:ring-violet-500'
        classList={{ 'bg-dark-400': location.pathname.startsWith(props.pathname) }}
        type='button'
        onClick={() => setOpen(!open())}
      >
        <div class='flex flex-row place-content-between place-items-center'>
          <div class='flex flex-row place-content-between place-items-center gap-4'>
            <span class='text-neutral-300'>{props.icon}</span>
            <h2 class='font-semibold'>{props.title}</h2>
          </div>

          <VsChevronDown class='h-6 w-auto text-neutral-300 duration-150 ease-in-out' classList={{ 'rotate-180': open(), 'rotate-0': !open() }} />
        </div>
      </button>

      <Show when={open()}>{props.children}</Show>
    </div>
  );
};

interface DisclosureProps {
  title: string;

  pathname: string;

  icon: JSX.Element;
}

export const PageLayout: ParentComponent = (props) => {
  const params = useParams();
  const [loading, setLoading] = createSignal(true);
  const [open, setOpen] = createSignal(false);
  const [projectParser, setProjectParser] = createSignal<ProjectParser | null>(null);
  const breakpoints = createBreakpoints({ lg: '1024px' });

  createEffect(() => {
    if (!breakpoints.lg) setOpen(false);
  });

  createEffect(() => {
    const packageData = packagesData()?.find((packageData) => packageData.name === params.package);

    if (packageData !== undefined) {
      const projectParser = packageData.packages.find((projectParser) => projectParser.version === params.version);

      if (projectParser !== undefined) {
        setProjectParser(projectParser);
        setLoading(false);
      }
    }
  });

  return (
    <>
      <header class='bg-dark-600 border-dark-100 fixed top-0 left-0 z-20 w-full border-b'>
        <div class='h-20 block px-6'>
          <div class='flex flex-row place-content-between place-items-center h-full'>
            <button
              class='lg:hidden flex place-items-center rounded p-1 focus:ring-2 focus:ring-violet-500'
              type='button'
              onClick={() => setOpen(!open())}
            >
              <VsMenu class='h-6 w-auto text-neutral-300' />
            </button>

            <div class='hidden md:flex md:flex-row'>
              <BreadCrumb />
            </div>
          </div>
        </div>
      </header>

      <nav
        class='bg-dark-600 border-dark-100 fixed top-20 left-0 z-10 h-[calc(100vh-80px)] w-full lg:w-72 border-r'
        classList={{ block: breakpoints.lg || open(), hidden: !breakpoints.lg && !open(), 'border-none': !breakpoints.lg }}
      >
        <div class='relative w-full h-full overflow-hidden'>
          <div class='absolute inset-0 overflow-auto mb-10'>
            <div class='flex flex-col gap-2 px-4 pt-4'>
              <ButtonLink name='Home' icon={<VsHome class='h-6 w-auto' />} href='/' />
              <ButtonLink name='Select Package' icon={<VsPackage class='h-6 w-auto' />} href='/docs' />
              <ButtonLink name='Select Version' icon={<VsVersions class='h-6 w-auto' />} href={`/docs/${params.package}`} />
            </div>

            <div class='border-dark-100 flex flex-col gap-2 pt-2 m-2 border-t h-full'>
              <Show
                when={!loading()}
                fallback={
                  <div class='flex flex-row place-content-center place-items-center h-1/4'>
                    <Spinner />
                  </div>
                }
              >
                <>
                  <Show when={projectParser()} keyed>
                    {(projectParser) => (
                      <>
                        <Show when={projectParser.namespaces.length}>
                          <Disclosure
                            title='Namespaces'
                            pathname={`/docs/${params.package}/${params.version}/namespace`}
                            icon={<VsSymbolNamespace class='h-6 w-auto' />}
                          >
                            <For each={projectParser.namespaces}>
                              {(namespaceParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/namespace/${namespaceParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{namespaceParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.classes.length}>
                          <Disclosure
                            title='Classes'
                            pathname={`/docs/${params.package}/${params.version}/class`}
                            icon={<VsSymbolClass class='h-6 w-auto' />}
                          >
                            <For each={projectParser.classes}>
                              {(classParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/class/${classParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{classParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.functions.length}>
                          <Disclosure
                            title='Functions'
                            pathname={`/docs/${params.package}/${params.version}/function`}
                            icon={<VsSymbolMethod class='h-6 w-auto' />}
                          >
                            <For each={projectParser.functions}>
                              {(functionParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/function/${functionParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{functionParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.interfaces.length}>
                          <Disclosure
                            title='Interfaces'
                            pathname={`/docs/${params.package}/${params.version}/interface`}
                            icon={<VsSymbolInterface class='h-6 w-auto' />}
                          >
                            <For each={projectParser.interfaces}>
                              {(interfaceParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/interface/${interfaceParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{interfaceParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.typeAliases.length}>
                          <Disclosure
                            title='Type Aliases'
                            pathname={`/docs/${params.package}/${params.version}/type-alias`}
                            icon={<VsSymbolField class='h-6 w-auto' />}
                          >
                            <For each={projectParser.typeAliases}>
                              {(typeAliasParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/type-alias/${typeAliasParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{typeAliasParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.enums.length}>
                          <Disclosure
                            title='Enums'
                            pathname={`/docs/${params.package}/${params.version}/enum`}
                            icon={<VsSymbolEnum class='h-6 w-auto' />}
                          >
                            <For each={projectParser.enums}>
                              {(enumParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/enum/${enumParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{enumParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>

                        <Show when={projectParser.variables.length}>
                          <Disclosure
                            title='Variables'
                            pathname={`/docs/${params.package}/${params.version}/variable`}
                            icon={<VsSymbolVariable class='h-6 w-auto' />}
                          >
                            <For each={projectParser.variables}>
                              {(variableParser) => (
                                <NavLink
                                  href={`/docs/${params.package}/${params.version}/variable/${variableParser.name}`}
                                  class='border-dark-100 flex flex-col border-l ml-4 pl-4 p-1 focus:rounded focus:border-none focus:ring-2 focus:ring-white'
                                  inactiveClass='hover:bg-dark-300'
                                  activeClass='bg-gradient rounded'
                                  onClick={() => setOpen(false)}
                                >
                                  <div class='flex flex-row place-items-center'>
                                    <span class='truncate'>{variableParser.name}</span>
                                  </div>
                                </NavLink>
                              )}
                            </For>
                          </Disclosure>
                        </Show>
                      </>
                    )}
                  </Show>
                </>
              </Show>
            </div>
          </div>
        </div>
      </nav>

      <main class='pt-20 lg:pl-72 mb-20 h-full'>
        <article class='bg-dark-900 relative min-h-[calc(100vh-80px)] p-6 pb-20 shadow h-full'>{props.children}</article>
      </main>
    </>
  );
};
