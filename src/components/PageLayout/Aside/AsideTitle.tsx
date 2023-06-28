import type { Component, JSX } from 'solid-js';

export const AsideTitle: Component<AsideTitleProps> = (props) => (
  <div class='flex flex-row place-items-center gap-2 mt-4 ml-2 select-none'>
    <span class='text-neutral-300'>{props.icon}</span>
    <span class='font-semibold'>{props.title}</span>
  </div>
);

export interface AsideTitleProps {
  title: string;

  icon: JSX.Element;
}
