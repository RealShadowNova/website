import { VsActivateBreakpoints, VsListSelection, VsSymbolField, VsSymbolMethod, VsSymbolParameter } from 'solid-icons/vs';
import { Match, Show, Switch, type Component } from 'solid-js';
import type { FunctionParser, SignatureParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { SelectSection } from '../PageLayout/SelectSection';
import { ParameterTable } from '../ParameterTable';
import { Pill } from '../Pill';
import { TypeParameterTable } from '../TypeParameterTable';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolMethod class='h-6 w-auto' />
    <span>{props.function.name}</span>

    <Show when={props.function.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  function: FunctionParser;
}

const Signatures: Component<SignaturesProps> = (props) => (
  <SelectSection
    sections={props.signatures.map((signature, i) => ({
      title: `Signature ${i + 1}`,
      icon: <VsSymbolMethod class='h-6 w-auto' />,
      content: <Signature signature={signature} />
    }))}
  />
);

interface SignaturesProps {
  signatures: SignatureParser[];
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsListSelection class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.signature.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  signature: SignatureParser;
}

const Signature: Component<SignatureProps> = (props) => {
  console.log(props.signature);

  return (
    <div class='flex flex-col gap-4'>
      <Summary signature={props.signature} />

      <Show when={props.signature.typeParameters.length}>
        <Section title='Type Parameters' icon={<VsSymbolParameter class='h-6 w-auto' />}>
          <TypeParameterTable typeParameters={props.signature.typeParameters} />
        </Section>
      </Show>

      <Show when={props.signature.parameters.length}>
        <Section title='Parameters' icon={<VsActivateBreakpoints class='h-6 w-auto' />} defaultOpen>
          <ParameterTable parameters={props.signature.parameters} />
        </Section>
      </Show>

      <Section title='Returns' icon={<VsSymbolField class='h-6 w-auto' />} defaultOpen>
        <span class='break-words font-mono text-lg'>
          <Content content={props.signature.returnType.toString()} />
        </span>
      </Section>
    </div>
  );
};

interface SignatureProps {
  signature: SignatureParser;
}

export const FunctionModel: Component<FunctionModelProps> = (props) => (
  <>
    <Title function={props.function} />

    <Show when={props.function.signatures.length}>
      <Switch>
        <Match when={props.function.signatures.length === 1}>
          <Signature signature={props.function.signatures[0]} />
        </Match>

        <Match when={props.function.signatures.length > 1}>
          <Signatures signatures={props.function.signatures} />
        </Match>
      </Switch>
    </Show>
  </>
);

export interface FunctionModelProps {
  function: FunctionParser;
}
