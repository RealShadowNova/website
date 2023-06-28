import { HiOutlineLink } from 'solid-icons/hi';
import { VsSymbolEnum, VsSymbolEnumMember } from 'solid-icons/vs';
import { For, Show, type Component } from 'solid-js';
import type { EnumMemberParser, EnumParser } from 'typedoc-json-parser';
import { Content } from '../Content';
import { Section } from '../PageLayout/Section';
import { Pill } from '../Pill';

const Title: Component<TitleProps> = (props) => (
  <h2 class='flex flex-row place-items-center gap-2 text-2xl font-bold'>
    <VsSymbolEnum class='h-6 w-auto' />
    <span>{props.enum.name}</span>

    <Show when={props.enum.comment.deprecated}>
      <Pill class='bg-red-500'>Deprecated</Pill>
    </Show>
  </h2>
);

interface TitleProps {
  enum: EnumParser;
}

const Summary: Component<SummaryProps> = (props) => (
  <Section title='Summary' icon={<VsSymbolEnum class='h-6 w-auto' />} defaultOpen>
    <span class='break-words'>
      <Content content={props.enum.comment.description ?? 'No summary provided.'} />
    </span>

    <div class='border-dark-100 -mx-8 mt-7 border-t-2' />
  </Section>
);

interface SummaryProps {
  enum: EnumParser;
}

const Member: Component<EnumProps> = (props) => (
  <div class='scroll-mt-20 flex flex-col gap-4' id={props.member.name}>
    <div class='md:-ml-8 flex flex-col gap-0.5 md:flex-row md:place-items-center md:gap-2'>
      <a class='hidden md:inline-block rounded focus:ring focus:ring-violet-500' href={`#${props.member.name}`}>
        <HiOutlineLink class='h-6 w-auto' />
      </a>

      <Show when={props.member.comment.deprecated}>
        <div class='flex flex-row gap-1'>
          <Pill class='bg-red-500'>Deprecated</Pill>
        </div>
      </Show>

      <div class='flex flex-row flex-wrap place-items-center'>
        <h4 class='break-words font-mono text-lg font-bold'>
          {props.member.name} = {props.member.value}
        </h4>
      </div>
    </div>

    <Show when={props.member.comment.description} keyed>
      {(description) => (
        <div class='flex flex-col gap-4'>
          <span class='break-words'>
            <Content content={description} />
          </span>
        </div>
      )}
    </Show>
  </div>
);

interface EnumProps {
  member: EnumMemberParser;
}

export const EnumModel: Component<EnumModelProps> = (props) => (
  <>
    <Title enum={props.enum} />

    <Summary enum={props.enum} />

    <Show when={props.enum.members.length}>
      <Section title='Members' icon={<VsSymbolEnumMember class='h-6 w-auto' />} defaultOpen>
        <div class='flex flex-col gap-4'>
          <For each={props.enum.members}>{(member) => <Member member={member} />}</For>
        </div>
      </Section>
    </Show>
  </>
);

export interface EnumModelProps {
  enum: EnumParser;
}
