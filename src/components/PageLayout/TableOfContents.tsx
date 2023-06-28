import { VsListSelection } from 'solid-icons/vs';
import type { ParentComponent } from 'solid-js';
import { Aside } from './Aside/Aside';
import { AsideTitle } from './Aside/AsideTitle';

export const TableOfContents: ParentComponent = (props) => (
  <Aside>
    <AsideTitle title='Contents' icon={<VsListSelection class='h-6 w-auto' />} />

    <div class='flex flex-col ml-2 gap-2'>{props.children}</div>
  </Aside>
);
