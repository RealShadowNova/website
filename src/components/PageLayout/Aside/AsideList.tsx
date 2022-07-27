import type { JSX, ParentComponent } from 'solid-js';

export const AsideList: ParentComponent<AsideListProps> = (props) => (
  <div class='flex flex-col'>
    <div class='flex flex-row place-items-center gap-4'>
      <span class='text-neutral-300'>{props.icon}</span>
      <div class='p-2 pl-0'>
        <h2 class='font-semibold'>{props.title}</h2>
      </div>
    </div>

    {props.children}
  </div>
);

export interface AsideListProps {
  title: string;

  icon: JSX.Element;
}
