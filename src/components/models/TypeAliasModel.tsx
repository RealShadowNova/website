import { VsSymbolField, VsSymbolParameter } from 'solid-icons/vs';
import { Show, type Component } from 'solid-js';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { Pill } from '../Pill';
import { TypeParameterTable } from '../TypeParameterTable';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolField class='h-6 w-auto' />
    <span>{props.typeAlias.name}</span>

    <Show when={props.typeAlias.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  typeAlias: TypeAliasParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsSymbolField class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.typeAlias.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  typeAlias: TypeAliasParser;
}

const TypeAlias: Component<TypeAliasProps> = (props) => (
  <div class='flex flex-row flex-wrap place-items-center'>
    <h4 class='break-words font-mono text-lg font-bold'>
      <Content content={props.typeAlias.type.toString()} />
    </h4>
  </div>
);

interface TypeAliasProps {
  typeAlias: TypeAliasParser;
}

export const TypeAliasModel: Component<TypeAliasModelProps> = (props) => (
  <>
    <Title typeAlias={props.typeAlias} />

    <Summary typeAlias={props.typeAlias} />

    <Show when={props.typeAlias.typeParameters.length}>
      <Section title='Type Parameters' icon={<VsSymbolParameter class='h-6 w-auto' />}>
        <TypeParameterTable typeParameters={props.typeAlias.typeParameters} />
      </Section>
    </Show>

    <TypeAlias typeAlias={props.typeAlias} />
  </>
);

export interface TypeAliasModelProps {
  typeAlias: TypeAliasParser;
}
