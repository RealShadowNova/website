import { VsSymbolVariable } from 'solid-icons/vs';
import { Show, type Component } from 'solid-js';
import type { VariableParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { Pill } from '../Pill';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolVariable class='h-6 w-auto' />
    <span>{props.variable.name}</span>

    <Show when={props.variable.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  variable: VariableParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsSymbolVariable class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.variable.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  variable: VariableParser;
}

const Variable: Component<VariableProps> = (props) => (
  <div class='flex flex-row flex-wrap place-items-center'>
    <h4 class='break-words font-mono text-lg font-bold'>
      {props.variable.name}: <Content content={props.variable.type.toString()} /> = {props.variable.value}
    </h4>
  </div>
);

interface VariableProps {
  variable: VariableParser;
}

export const VariableModel: Component<VariableModelProps> = (props) => (
  <>
    <Title variable={props.variable} />

    <Summary variable={props.variable} />

    <Variable variable={props.variable} />
  </>
);

export interface VariableModelProps {
  variable: VariableParser;
}
