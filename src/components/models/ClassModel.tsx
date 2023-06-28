import { HiOutlineLink } from 'solid-icons/hi';
import { VsListSelection, VsSymbolClass, VsSymbolMethod, VsSymbolParameter, VsSymbolProperty } from 'solid-icons/vs';
import { For, Show, type Component } from 'solid-js';
import { ClassConstructorParser, ClassParser, ClassPropertyParser, TypeParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { ParameterTable } from '../ParameterTable';
import { Pill } from '../Pill';
import { TypeParameterTable } from '../TypeParameterTable';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolClass class='h-6 w-auto' />
    <span>{props.class.name}</span>

    <Show when={props.class.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  class: ClassParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsListSelection class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.class.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  class: ClassParser;
}

const Extends: Component<ExtendsProps> = (props) => (
  <div class='flex flex-row place-items-center gap-4 py-2'>
    <h3 class='text-xl font-bold'>Extends</h3>
    <span class='break-words font-mono text-lg'>
      <Content content={props.type.toString()} />
    </span>
  </div>
);

interface ExtendsProps {
  type: TypeParser;
}

const Implements: Component<ImplementsProps> = (props) => {
  return (
    <div class='flex flex-row place-items-center gap-4 py-2'>
      <h3 class='text-xl font-bold'>Implements</h3>
      <span class='break-words font-mono text-lg'>
        <Content content={props.types.map((parser) => parser.toString()).join(' | ')} />
      </span>
    </div>
  );
};

interface ImplementsProps {
  types: TypeParser[];
}

const Constructor: Component<ConstructorProps> = (props) => (
  <Section title='Constructor' icon={<VsSymbolMethod class='h-6 w-auto' />} defaultOpen>
    <ParameterTable parameters={props.construct.parameters} />
  </Section>
);

interface ConstructorProps {
  construct: ClassConstructorParser;
}

const Property: Component<PropertyProps> = (props) => (
  <div class='scroll-mt-20 flex flex-col gap-4' id={props.property.name}>
    <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
      <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.property.name}`}>
        <HiOutlineLink class='h-6 w-auto' />
      </a>

      <Show
        when={
          props.property.comment.deprecated ||
          props.property.static ||
          props.property.readonly ||
          props.property.optional ||
          [ClassParser.Accessibility.Protected, ClassParser.Accessibility.Private].includes(props.property.accessibility)
        }
      >
        <div class='flex flex-row gap-1'>
          <Show when={props.property.comment.deprecated}>
            <Pill class='bg-red-500'>Deprecated</Pill>
          </Show>

          <Show when={props.property.static}>
            <Pill class='bg-blue-500'>Static</Pill>
          </Show>

          <Show when={props.property.readonly}>
            <Pill class='bg-violet-500'>Readonly</Pill>
          </Show>

          <Show when={props.property.optional}>
            <Pill class='bg-violet-500'>Optional</Pill>
          </Show>

          <Show when={props.property.accessibility === ClassParser.Accessibility.Protected}>
            <Pill class='bg-orange-500'>Protected</Pill>
          </Show>

          <Show when={props.property.accessibility === ClassParser.Accessibility.Private}>
            <Pill class='bg-red-500'>Private</Pill>
          </Show>
        </div>
      </Show>

      <div class='flex flex-row flex-wrap place-items-center'>
        <h4 class='break-words font-mono text-lg font-bold'>{props.property.name}</h4>
        <Show when={props.property.type} keyed>
          {(type) => (
            <h4 class='break-words font-mono text-lg font-bold'>
              : <Content content={type.toString()} />
            </h4>
          )}
        </Show>
      </div>
    </div>

    <Show when={props.property.comment.description} keyed>
      {(description) => (
        <div class='flex flex-col gap-4'>
          <span class='break-words'>
            <Content content={description} />
          </span>
        </div>
      )}
    </Show>

    <div class='border-dark-100 -mx-8 border-t-2' />
  </div>
);

interface PropertyProps {
  property: ClassPropertyParser;
}

export const ClassModel: Component<ClassModelProps> = (props) => (
  <>
    <Title class={props.class} />

    <Summary class={props.class} />

    <Show when={props.class.extendsType} keyed>
      {(extendsType) => <Extends type={extendsType} />}
    </Show>

    <Show when={props.class.implementsType.length}>
      <Implements types={props.class.implementsType} />
    </Show>

    <Show when={props.class.typeParameters.length}>
      <Section title='Type Parameters' icon={<VsSymbolParameter class='h-6 w-auto' />}>
        <TypeParameterTable typeParameters={props.class.typeParameters} />
      </Section>
    </Show>

    <Show when={props.class.construct.parameters.length}>
      <Constructor construct={props.class.construct} />
    </Show>

    <Show when={props.class.properties.length}>
      <Section title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.class.properties}>{(property) => <Property property={property} />}</For>
        </div>
      </Section>
    </Show>
  </>
);

export interface ClassModelProps {
  class: ClassParser;
}
