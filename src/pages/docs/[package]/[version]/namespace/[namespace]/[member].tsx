import { useParams } from '@solidjs/router';
import { VsSymbolEnumMember, VsSymbolMethod, VsSymbolProperty } from 'solid-icons/vs';
import { For, Match, Show, Switch, createEffect, createResource, type Component } from 'solid-js';
import { ClassParser, EnumParser, FunctionParser, InterfaceParser, ProjectParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
import { AsideList } from '../../../../../../components/PageLayout/Aside/AsideList';
import { AsideListItem } from '../../../../../../components/PageLayout/Aside/AsideListItem';
import { PageLayout } from '../../../../../../components/PageLayout/PageLayout';
import { TableOfContents } from '../../../../../../components/PageLayout/TableOfContents';
import { Spinner } from '../../../../../../components/Spinner';
import { ClassModel } from '../../../../../../components/models/ClassModel';
import { EnumModel } from '../../../../../../components/models/EnumModel';
import { FunctionModel } from '../../../../../../components/models/FunctionModel';
import { InterfaceModel } from '../../../../../../components/models/InterfaceModel';
import { TypeAliasModel } from '../../../../../../components/models/TypeAliasModel';
import { VariableModel } from '../../../../../../components/models/VariableModel';

const Member: Component = () => {
  const params = useParams();
  const [parser, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.Json | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const namespaceParser = projectParser.namespaces.find((namespaceParser) => namespaceParser.name === params.namespace);

    if (namespaceParser === undefined) {
      throw new Error(`Namespace '${params.namespace}' not found.`);
    }

    const parser = findNamespaceMember(namespaceParser, params.member);

    if (parser === undefined) {
      throw new Error(`Member '${params.member}' not found.`);
    }

    return parser;
  });

  createEffect(() => {
    params.namespace;
    params.member;

    void refetch();
  });

  return (
    <PageLayout>
      <div class='flex flex-col gap-4 h-full'>
        <Show
          when={parser()}
          fallback={
            <div class='flex flex-row place-content-center place-items-center h-full'>
              <Spinner />
            </div>
          }
          keyed
        >
          {(parser) => (
            <Switch>
              <Match when={parser instanceof ClassParser}>
                <ClassModel class={parser as ClassParser} />
              </Match>

              <Match when={parser instanceof FunctionParser}>
                <FunctionModel function={parser as FunctionParser} />
              </Match>

              <Match when={parser instanceof InterfaceParser}>
                <InterfaceModel interface={parser as InterfaceParser} />
              </Match>

              <Match when={parser instanceof TypeAliasParser}>
                <TypeAliasModel typeAlias={parser as TypeAliasParser} />
              </Match>

              <Match when={parser instanceof EnumParser}>
                <EnumModel enum={parser as EnumParser} />
              </Match>

              <Match when={parser instanceof VariableParser}>
                <VariableModel variable={parser as VariableParser} />
              </Match>
            </Switch>
          )}
        </Show>
      </div>

      <Show when={parser()} keyed>
        {(parser) => (
          <Switch>
            <Match when={parser instanceof ClassParser}>
              <TableOfContents>
                <>
                  <Show when={(parser as ClassParser).properties.length}>
                    <AsideList title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />}>
                      <For each={(parser as ClassParser).properties}>{(property) => <AsideListItem name={property.name} />}</For>
                    </AsideList>
                  </Show>

                  <Show when={(parser as ClassParser).methods.length}>
                    <AsideList title='Methods' icon={<VsSymbolMethod class='h-6 w-auto' />}>
                      <For each={(parser as ClassParser).methods}>{(method) => <AsideListItem name={method.name} />}</For>
                    </AsideList>
                  </Show>
                </>
              </TableOfContents>
            </Match>

            <Match when={parser instanceof EnumParser}>
              <TableOfContents>
                <Show when={(parser as EnumParser).members.length}>
                  <AsideList title='Members' icon={<VsSymbolEnumMember class='h-6 w-auto' />}>
                    <For each={(parser as EnumParser).members}>{(member) => <AsideListItem name={member.name} />}</For>
                  </AsideList>
                </Show>
              </TableOfContents>
            </Match>

            <Match when={parser instanceof InterfaceParser}>
              <TableOfContents>
                <>
                  <Show when={(parser as InterfaceParser).properties.length}>
                    <AsideList title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />}>
                      <For each={(parser as InterfaceParser).properties}>{(property) => <AsideListItem name={property.name} />}</For>
                    </AsideList>
                  </Show>

                  <Show when={(parser as InterfaceParser).methods.length}>
                    <AsideList title='Methods' icon={<VsSymbolMethod class='h-6 w-auto' />}>
                      <For each={(parser as InterfaceParser).methods}>{(method) => <AsideListItem name={method.name} />}</For>
                    </AsideList>
                  </Show>
                </>
              </TableOfContents>
            </Match>
          </Switch>
        )}
      </Show>
    </PageLayout>
  );
};

export default Member;
