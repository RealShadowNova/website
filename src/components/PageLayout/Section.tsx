import { VsChevronDown } from 'solid-icons/vs';
import { createSignal, JSX, ParentComponent, Show } from 'solid-js';

export const Section: ParentComponent<SectionProps> = (props) => {
  const [open, setOpen] = createSignal(props.defaultOpen ?? false);

  return (
    <section class='flex flex-col'>
      <button class='bg-dark-600 hover:bg-dark-500 rounded p-4 focus:ring-2 focus:ring-violet-500' type='button' onClick={() => setOpen(!open())}>
        <div class='flex flex-row place-content-between place-items-center'>
          <div class='flex flex-row place-items-center gap-2'>
            <span class='text-neutral-300'>{props.icon}</span>
            <span class='font-semibold'>{props.title}</span>
          </div>

          <VsChevronDown class='h-6 w-auto text-neutral-300 duration-150 ease-in-out' classList={{ 'rotate-180': open(), 'rotate-0': !open() }} />
        </div>
      </button>

      <Show when={open()}>
        <div class='p-5 mx-6'>{props.children}</div>
      </Show>
    </section>
  );
};

export interface SectionProps {
  title: string;

  icon: JSX.Element;

  defaultOpen?: boolean;
}
