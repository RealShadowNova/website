import type { ParentComponent } from 'solid-js';

export const TableCell: ParentComponent<TableCellProps> = (props) => (
  <td class='border-dark-100 border-b px-3 py-2 text-left text-sm' classList={props.class ? { [props.class]: true } : undefined}>
    {props.children}
  </td>
);

export interface TableCellProps {
  class?: string;
}
