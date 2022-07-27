import { HiOutlineLink } from 'solid-icons/hi';
import { VsSymbolInterface, VsSymbolProperty } from 'solid-icons/vs';
import { For, Show, type Component } from 'solid-js';
import type { InterfaceParser, InterfacePropertyParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { Pill } from '../Pill';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolInterface class='h-6 w-auto' />
    <span>{props.interface.name}</span>

    <Show when={props.interface.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  interface: InterfaceParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsSymbolInterface class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.interface.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  interface: InterfaceParser;
}

const Property: Component<PropertyProps> = (props) => (
  <div class='scroll-mt-20 flex flex-col gap-4' id={props.property.name}>
    <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
      <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.property.name}`}>
        <HiOutlineLink class='h-6 w-auto' />
      </a>

      <Show when={props.property.comment.deprecated || props.property.readonly}>
        <div class='flex flex-row gap-1'>
          <Show when={props.property.comment.deprecated}>
            <Pill class='bg-red-500'>Deprecated</Pill>
          </Show>

          <Show when={props.property.readonly}>
            <Pill class='bg-violet-500'>Readonly</Pill>
          </Show>
        </div>
      </Show>

      <div class='flex flex-row flex-wrap place-items-center'>
        <h4 class='break-words font-mono text-lg font-bold'>{props.property.name}</h4>
        <Show when={props.property.type} keyed>
          {(type) => (
            <span class='break-words font-mono text-lg font-bold'>
              : <Content content={type.toString()} />
            </span>
          )}
        </Show>
      </div>
    </div>

    <div class='flex flex-col gap-4'>
      <Show when={props.property.comment.description} keyed>
        {(description) => (
          <span class='break-words'>
            <Content content={description} />
          </span>
        )}
      </Show>
    </div>

    <div class='border-dark-100 -mx-8 border-t-2' />
  </div>
);

interface PropertyProps {
  property: InterfacePropertyParser;
}

export const InterfaceModel: Component<InterfaceModelProps> = (props) => (
  <>
    <Title interface={props.interface} />

    <Summary interface={props.interface} />

    <Show when={props.interface.properties.length}>
      <Section title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.interface.properties}>{(property) => <Property property={property} />}</For>
        </div>
      </Section>
    </Show>
  </>
);

export interface InterfaceModelProps {
  interface: InterfaceParser;
}
