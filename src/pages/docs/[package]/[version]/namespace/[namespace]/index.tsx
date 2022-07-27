import { useParams } from '@solidjs/router';
import { VsSymbolClass, VsSymbolEnum, VsSymbolField, VsSymbolInterface, VsSymbolMethod, VsSymbolNamespace, VsSymbolVariable } from 'solid-icons/vs';
import { For, Show, createEffect, createResource, type Component } from 'solid-js';
import { NamespaceParser, ProjectParser } from 'typedoc-json-parser';
import { AsideList } from '../../../../../../components/PageLayout/Aside/AsideList';
import { AsideListItem } from '../../../../../../components/PageLayout/Aside/AsideListItem';
import { PageLayout } from '../../../../../../components/PageLayout/PageLayout';
import { TableOfContents } from '../../../../../../components/PageLayout/TableOfContents';
import { Spinner } from '../../../../../../components/Spinner';
import { NamespaceModel } from '../../../../../../components/models/NamespaceModel';

const Namespace: Component = () => {
  const params = useParams();
  const [parser, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.JSON | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const parser = projectParser.namespaces.find((namespaceParser) => namespaceParser.name === params.namespace);

    if (parser === undefined) {
      throw new Error(`Namespace '${params.namespace}' not found.`);
    }

    return parser;
  });

  createEffect(() => {
    params.namespace;

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
          {(parser) => <NamespaceModel namespace={parser as NamespaceParser} />}
        </Show>
      </div>

      <TableOfContents>
        <Show when={parser()} keyed>
          {(parser) => (
            <>
              <Show when={(parser as NamespaceParser).namespaces.length}>
                <AsideList title='Namespaces' icon={<VsSymbolNamespace class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).namespaces}>{(namespaceParser) => <AsideListItem name={namespaceParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).classes.length}>
                <AsideList title='Classes' icon={<VsSymbolClass class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).classes}>{(classParser) => <AsideListItem name={classParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).functions.length}>
                <AsideList title='Functions' icon={<VsSymbolMethod class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).functions}>{(functionParser) => <AsideListItem name={functionParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).interfaces.length}>
                <AsideList title='Interfaces' icon={<VsSymbolInterface class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).interfaces}>{(interfaceParser) => <AsideListItem name={interfaceParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).typeAliases.length}>
                <AsideList title='Type aliases' icon={<VsSymbolField class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).typeAliases}>{(typeAliasParser) => <AsideListItem name={typeAliasParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).enums.length}>
                <AsideList title='Enums' icon={<VsSymbolEnum class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).enums}>{(enumParser) => <AsideListItem name={enumParser.name} />}</For>
                </AsideList>
              </Show>

              <Show when={(parser as NamespaceParser).variables.length}>
                <AsideList title='Variables' icon={<VsSymbolVariable class='h-6 w-auto' />}>
                  <For each={(parser as NamespaceParser).variables}>{(variableParser) => <AsideListItem name={variableParser.name} />}</For>
                </AsideList>
              </Show>
            </>
          )}
        </Show>
      </TableOfContents>
    </PageLayout>
  );
};

export default Namespace;
