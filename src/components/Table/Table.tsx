import { For, ParentComponent } from 'solid-js';

export const Table: ParentComponent<TableProps> = (props) => (
  <table class='w-full border-collapse'>
    <thead>
      <tr>
        <For each={props.columns}>{(column) => <th class='border-dark-100 break-normal border-b px-3 py-2 text-left text-sm'>{column}</th>}</For>
      </tr>
    </thead>
    <tbody>{props.children}</tbody>
  </table>
);

export interface TableProps {
  columns: string[];
}
