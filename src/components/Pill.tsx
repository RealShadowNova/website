import type { ParentComponent } from 'solid-js';

export const Pill: ParentComponent<PillProps> = (props) => (
  <div class='p-0.5 px-2 uppercase text-xs font-semibold rounded-full' classList={{ [props.class ?? 'bg-violet-500']: true }}>
    {props.children}
  </div>
);

export interface PillProps {
  class?: string;
}
