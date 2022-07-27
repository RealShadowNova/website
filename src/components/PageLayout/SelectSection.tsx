import { VsChevronDown } from 'solid-icons/vs';
import { JSX, Show, createSignal, type Component } from 'solid-js';

export const SelectSection: Component<SelectSectionProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [index, setIndex] = createSignal(0);

  return (
    <div class='flex flex-col'>
      <div class='flex flex-col gap-2'>
        <button class='bg-dark-600 hover:bg-dark-500 rounded p-4 focus:ring-2 focus:ring-violet-500' type='button' onClick={() => setOpen(!open())}>
          <div class='flex flex-row place-content-between place-items-center'>
            <div class='flex flex-row place-items-center gap-2'>
              <span class='text-neutral-300'>{props.sections[index()].icon}</span>
              <span class='font-semibold'>{props.sections[index()].title}</span>
            </div>

            <VsChevronDown class='h-6 w-auto text-neutral-300 duration-150 ease-in-out' classList={{ 'rotate-180': open(), 'rotate-0': !open() }} />
          </div>
        </button>

        <Show when={open()}>
          <div class='border-dark-100 flex flex-col gap-2 rounded border'>
            {props.sections.map((section, i) => (
              <button
                class='flex flex-row w-full hover:bg-dark-500 rounded p-4 focus:ring-2 focus:ring-violet-500'
                classList={{ 'bg-dark-400': i === index() }}
                type='button'
                onClick={() => {
                  setIndex(i);
                  setOpen(false);
                }}
              >
                <div class='flex flex-row place-content-between place-items-center'>
                  <div class='flex flex-row place-items-center gap-2'>
                    <span class='text-neutral-300'>{section.icon}</span>
                    <span class='font-semibold'>{section.title}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Show>
      </div>

      <div class='p-5 mx-6'>{props.sections[index()].content}</div>
    </div>
  );
};

interface SelectSectionProps {
  sections: Section[];
}

interface Section {
  title: string;

  icon: JSX.Element;

  content: JSX.Element;
}
