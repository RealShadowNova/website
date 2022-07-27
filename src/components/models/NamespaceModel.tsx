import { Link, useLocation } from '@solidjs/router';
import { HiOutlineLink } from 'solid-icons/hi';
import {
  VsListSelection,
  VsSymbolClass,
  VsSymbolEnum,
  VsSymbolField,
  VsSymbolInterface,
  VsSymbolMethod,
  VsSymbolNamespace,
  VsSymbolVariable
} from 'solid-icons/vs';
import { For, Show, type Component } from 'solid-js';
import type { ClassParser, EnumParser, FunctionParser, InterfaceParser, NamespaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { Pill } from '../Pill';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolNamespace class='h-6 w-auto' />
    <span>{props.namespace.name}</span>

    <Show when={props.namespace.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  namespace: NamespaceParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsListSelection class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.namespace.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  namespace: NamespaceParser;
}

const Namespace: Component<NamespaceProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.namespace.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.namespace.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.namespace.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link
            class='break-words font-mono text-lg font-bold hover:underline text-violet-500'
            href={`${location.pathname}/namespace/${props.namespace.name}`}
          >
            {props.namespace.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface NamespaceProps {
  namespace: NamespaceParser;
}

const Class: Component<ClassProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.class.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.class.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.class.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link class='break-words font-mono text-lg font-bold hover:underline' href={`${location.pathname}/class/${props.class.name}`}>
            {props.class.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ClassProps {
  class: ClassParser;
}

const Function: Component<FunctionProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.function.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.function.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.function.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link
            class='break-words font-mono text-lg font-bold hover:underline text-violet-500'
            href={`${location.pathname}/function/${props.function.name}`}
          >
            {props.function.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface FunctionProps {
  function: FunctionParser;
}

const Interface: Component<InterfaceProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.interface.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.interface.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.interface.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link
            class='break-words font-mono text-lg font-bold hover:underline text-violet-500'
            href={`${location.pathname}/interface/${props.interface.name}`}
          >
            {props.interface.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface InterfaceProps {
  interface: InterfaceParser;
}

const TypeAlias: Component<TypeAliasProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.typeAlias.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.typeAlias.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.typeAlias.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link
            class='break-words font-mono text-lg font-bold hover:underline text-violet-500'
            href={`${location.pathname}/type-alias/${props.typeAlias.name}`}
          >
            {props.typeAlias.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface TypeAliasProps {
  typeAlias: TypeAliasParser;
}

const Enum: Component<EnumProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.enum.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.enum.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.enum.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link class='break-words font-mono text-lg font-bold hover:underline text-violet-500' href={`${location.pathname}/enum/${props.enum.name}`}>
            {props.enum.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface EnumProps {
  enum: EnumParser;
}

const Variable: Component<VariableProps> = (props) => {
  const location = useLocation();

  return (
    <div class='scroll-mt-20 flex flex-col gap-4' id={props.variable.name}>
      <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
        <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.variable.name}`}>
          <HiOutlineLink class='h-6 w-auto' />
        </a>

        <Show when={props.variable.comment.deprecated}>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </Show>

        <div class='flex flex-row flex-wrap place-items-center'>
          <Link
            class='break-words font-mono text-lg font-bold hover:underline text-violet-500'
            href={`${location.pathname}/variable/${props.variable.name}`}
          >
            {props.variable.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

interface VariableProps {
  variable: VariableParser;
}

export const NamespaceModel: Component<NamespaceModelProps> = (props) => (
  <>
    <Title namespace={props.namespace} />

    <Summary namespace={props.namespace} />

    <Show when={props.namespace.namespaces.length}>
      <Section title='Namespaces' icon={<VsSymbolNamespace class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.namespaces}>{(parser) => <Namespace namespace={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.classes.length}>
      <Section title='Classes' icon={<VsSymbolClass class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.classes}>{(parser) => <Class class={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.functions.length}>
      <Section title='Functions' icon={<VsSymbolMethod class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.functions}>{(parser) => <Function function={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.interfaces.length}>
      <Section title='Interfaces' icon={<VsSymbolInterface class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.interfaces}>{(parser) => <Interface interface={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.typeAliases.length}>
      <Section title='Type Aliases' icon={<VsSymbolField class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.typeAliases}>{(parser) => <TypeAlias typeAlias={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.enums.length}>
      <Section title='Enums' icon={<VsSymbolEnum class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.enums}>{(parser) => <Enum enum={parser} />}</For>
        </div>
      </Section>
    </Show>

    <Show when={props.namespace.variables.length}>
      <Section title='Variables' icon={<VsSymbolVariable class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.namespace.variables}>{(parser) => <Variable variable={parser} />}</For>
        </div>
      </Section>
    </Show>
  </>
);

export interface NamespaceModelProps {
  namespace: NamespaceParser;
}
