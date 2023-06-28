import { For, Show, type Component } from 'solid-js';
import type { ParameterParser } from 'typedoc-json-parser';
import { Content } from './Content';
import { Table } from './Table/Table';
import { TableCell } from './Table/TableCell';

export const ParameterTable: Component<ParameterTableProps> = (props) => (
  <Table columns={['Name', 'Type', 'Description']}>
    <For each={props.parameters}>
      {(parameter) => (
        <tr>
          <TableCell class='font-mono whitespace-nowrap'>
            <Show when={parameter.rest}>...</Show>
            {parameter.name}
          </TableCell>
          <TableCell class='font-mono whitespace-pre-wrap break-normal'>
            <Content content={parameter.type?.toString()} />
          </TableCell>
          <TableCell class='font-mono whitespace-pre-wrap break-normal'>
            <Content content={parameter.comment.description || 'None'} />
          </TableCell>
        </tr>
      )}
    </For>
  </Table>
);

export interface ParameterTableProps {
  parameters: ParameterParser[];
}
