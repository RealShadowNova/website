import { useParams } from '@solidjs/router';
import { VsSymbolEnumMember } from 'solid-icons/vs';
import { For, Show, createEffect, createResource, type Component } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { AsideList } from '../../../../../components/PageLayout/Aside/AsideList';
import { AsideListItem } from '../../../../../components/PageLayout/Aside/AsideListItem';
import { PageLayout } from '../../../../../components/PageLayout/PageLayout';
import { TableOfContents } from '../../../../../components/PageLayout/TableOfContents';
import { Spinner } from '../../../../../components/Spinner';
import { EnumModel } from '../../../../../components/models/EnumModel';

const Enum: Component = () => {
  const params = useParams();
  const [parser, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.JSON | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const parser = projectParser.enums.find((enumParser) => enumParser.name === params.enum);

    if (parser === undefined) {
      throw new Error(`Enum '${params.interface}' not found.`);
    }

    return parser;
  });

  createEffect(() => {
    params.interface;

    void refetch();
  });

  return (
    <PageLayout>
      <div class='flex flex-col gap-4 xl:mr-64 h-full'>
        <Show
          when={parser()}
          fallback={
            <div class='flex flex-row place-content-center place-items-center h-full'>
              <Spinner />
            </div>
          }
          keyed
        >
          {(parser) => <EnumModel enum={parser} />}
        </Show>
      </div>

      <TableOfContents>
        <Show when={parser()} fallback={<Spinner />} keyed>
          {(parser) => (
            <Show when={parser.members.length}>
              <AsideList title='Members' icon={<VsSymbolEnumMember class='h-6 w-auto' />}>
                <For each={parser.members}>{(member) => <AsideListItem name={member.name} />}</For>
              </AsideList>
            </Show>
          )}
        </Show>
      </TableOfContents>
    </PageLayout>
  );
};

export default Enum;
