import { For, Show, type Component } from 'solid-js';
import { Content } from './Content';
import { Table } from './Table/Table';
import { TableCell } from './Table/TableCell';

export const TypeParameterTable: Component<TypeParameterTableProps> = (props) => (
  <Table columns={['Name', 'Constraint', 'Default']}>
    <For each={props.typeParameters}>
      {(typeParameter) => (
        <tr>
          <TableCell class='font-mono whitespace-nowrap'>{typeParameter.name}</TableCell>
          <TableCell class='font-mono whitespace-pre-wrap break-normal'>
            <Show when={typeParameter.constraint} keyed>
              {(constraintType) => <Content content={constraintType.toString()} />}
            </Show>
          </TableCell>
          <TableCell class='font-mono whitespace-pre-wrap break-normal'>
            <Show when={typeParameter.default} keyed>
              {(defaultType) => <Content content={defaultType.toString()} />}
            </Show>
          </TableCell>
        </tr>
      )}
    </For>
  </Table>
);

export interface TypeParameterTableProps {
  typeParameters: TypeParameterParser[];
}
