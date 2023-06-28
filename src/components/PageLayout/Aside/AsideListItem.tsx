import type { Component } from 'solid-js';

export const AsideListItem: Component<AsideListItemProps> = (props) => (
  <a
    class='hover:bg-dark-300 border-dark-100 border-l p-1 pl-6 ml-2 text-sm focus:rounded focus:border-none focus:ring-2 focus:ring-violet-500'
    href={`#${props.name}`}
  >
    {props.name}
  </a>
);

export interface AsideListItemProps {
  name: string;
}
