import { useParams } from '@solidjs/router';
import {
  VsSymbolClass,
  VsSymbolEnum,
  VsSymbolEnumMember,
  VsSymbolInterface,
  VsSymbolMethod,
  VsSymbolNamespace,
  VsSymbolProperty,
  VsSymbolVariable
} from 'solid-icons/vs';
import { For, Match, Show, Switch, createEffect, createResource, type Component } from 'solid-js';
import {
  ClassParser,
  EnumParser,
  FunctionParser,
  InterfaceParser,
  NamespaceParser,
  ProjectParser,
  TypeAliasParser,
  VariableParser
} from 'typedoc-json-parser';
import { AsideList } from '../../../../../components/PageLayout/Aside/AsideList';
import { AsideListItem } from '../../../../../components/PageLayout/Aside/AsideListItem';
import { PageLayout } from '../../../../../components/PageLayout/PageLayout';
import { TableOfContents } from '../../../../../components/PageLayout/TableOfContents';
import { Spinner } from '../../../../../components/Spinner';
import { ClassModel } from '../../../../../components/models/ClassModel';
import { EnumModel } from '../../../../../components/models/EnumModel';
import { FunctionModel } from '../../../../../components/models/FunctionModel';
import { InterfaceModel } from '../../../../../components/models/InterfaceModel';
import { NamespaceModel } from '../../../../../components/models/NamespaceModel';
import { TypeAliasModel } from '../../../../../components/models/TypeAliasModel';
import { VariableModel } from '../../../../../components/models/VariableModel';

interface GetNamespaceOrMember {
  value: NamespaceParser | ClassParser | EnumParser | FunctionParser | InterfaceParser | TypeAliasParser | VariableParser;
  parent: NamespaceParser | null;
  segments: string[];
}

function getNamespaceOrMember(path: string, projectParser: ProjectParser): GetNamespaceOrMember | null {
  const segments = path.split('/');
  let current: NamespaceParser | ClassParser | EnumParser | FunctionParser | InterfaceParser | TypeAliasParser | VariableParser | null = null;
  let parent: NamespaceParser | null = null;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment === '') return null;

    switch (segment) {
      case 'namespace': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.namespaces.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'class': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.classes.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'enum': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.enums.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'function': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.functions.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'interface': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.interfaces.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'type-alias': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.typeAliases.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      case 'variable': {
        if (current === null) return null;
        if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.variables.find((child) => child.name === segments[i + 1]);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }

      default: {
        if (current === null) {
          const namespace = projectParser.namespaces.find((namespace) => namespace.name === segment);

          if (namespace === undefined) return null;

          current = namespace;
        } else if (current instanceof NamespaceParser) {
          const namespace = current as NamespaceParser;
          const member = namespace.children.find((child) => child.name === segment);

          if (member === undefined) return null;

          current = member;
          parent = namespace;
        }

        break;
      }
    }
  }

  return current === null ? null : { value: current, parent, segments };
}

const Namespace: Component = () => {
  const params = useParams();
  const [namespaceOrMember, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.Json | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const namespaceOrMember = getNamespaceOrMember(params.namespace, projectParser);

    if (namespaceOrMember === null) {
      throw new Error(`Namespace '${params.namespace}' not found.`);
    }

    return namespaceOrMember;
  });

  createEffect(() => {
    params.namespace;

    void refetch();
  });

  return (
    <PageLayout>
      <div class='flex flex-col gap-4 xl:mr-64 h-full'>
        <Show
          when={namespaceOrMember()}
          fallback={
            <div class='flex flex-row place-content-center place-items-center h-full'>
              <Spinner />
            </div>
          }
          keyed
        >
          {(namespaceOrMember) => (
            <>
              <Switch>
                <Match when={namespaceOrMember.value instanceof NamespaceParser}>
                  <NamespaceModel namespace={namespaceOrMember.value as NamespaceParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof ClassParser}>
                  <ClassModel class={namespaceOrMember.value as ClassParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof EnumParser}>
                  <EnumModel enum={namespaceOrMember.value as EnumParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof FunctionParser}>
                  <FunctionModel function={namespaceOrMember.value as FunctionParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof InterfaceParser}>
                  <InterfaceModel interface={namespaceOrMember.value as InterfaceParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof TypeAliasParser}>
                  <TypeAliasModel typeAlias={namespaceOrMember.value as TypeAliasParser} />
                </Match>

                <Match when={namespaceOrMember.value instanceof VariableParser}>
                  <VariableModel variable={namespaceOrMember.value as VariableParser} />
                </Match>
              </Switch>
            </>
          )}
        </Show>
      </div>

      <Show when={namespaceOrMember()} keyed>
        {(namespaceOrMember) => (
          <Switch>
            <Match when={namespaceOrMember.value instanceof NamespaceParser}>
              <TableOfContents>
                <>
                  <Show when={(namespaceOrMember.value as NamespaceParser).namespaces.length}>
                    <AsideList title='Namespaces' icon={<VsSymbolNamespace class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).namespaces}>
                        {(namespaceParser) => <AsideListItem name={namespaceParser.name} />}
                      </For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as NamespaceParser).classes.length}>
                    <AsideList title='Classes' icon={<VsSymbolClass class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).classes}>
                        {(classParser) => <AsideListItem name={classParser.name} />}
                      </For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as NamespaceParser).enums.length}>
                    <AsideList title='Enums' icon={<VsSymbolEnum class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).enums}>{(enumParser) => <AsideListItem name={enumParser.name} />}</For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as NamespaceParser).functions.length}>
                    <AsideList title='Functions' icon={<VsSymbolMethod class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).functions}>
                        {(functionParser) => <AsideListItem name={functionParser.name} />}
                      </For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as NamespaceParser).interfaces.length}>
                    <AsideList title='Interfaces' icon={<VsSymbolInterface class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).interfaces}>
                        {(interfaceParser) => <AsideListItem name={interfaceParser.name} />}
                      </For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as NamespaceParser).typeAliases.length}>
                    <AsideList title='Type Aliases' icon={<VsSymbolVariable class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as NamespaceParser).typeAliases}>
                        {(typeAliasParser) => <AsideListItem name={typeAliasParser.name} />}
                      </For>
                    </AsideList>
                  </Show>
                </>
              </TableOfContents>
            </Match>

            <Match when={namespaceOrMember.value instanceof ClassParser}>
              <TableOfContents>
                <>
                  <Show when={(namespaceOrMember.value as ClassParser).properties.length}>
                    <AsideList title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as ClassParser).properties}>
                        {(propertyParser) => <AsideListItem name={propertyParser.name} />}
                      </For>
                    </AsideList>
                  </Show>

                  <Show when={(namespaceOrMember.value as ClassParser).methods.length}>
                    <AsideList title='Methods' icon={<VsSymbolMethod class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as ClassParser).methods}>
                        {(methodParser) => <AsideListItem name={methodParser.name} />}
                      </For>
                    </AsideList>
                  </Show>
                </>
              </TableOfContents>
            </Match>

            <Match when={namespaceOrMember.value instanceof EnumParser}>
              <TableOfContents>
                <>
                  <Show when={(namespaceOrMember.value as EnumParser).members.length}>
                    <AsideList title='Members' icon={<VsSymbolEnumMember class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as EnumParser).members}>{(memberParser) => <AsideListItem name={memberParser.name} />}</For>
                    </AsideList>
                  </Show>
                </>
              </TableOfContents>
            </Match>

            <Match when={namespaceOrMember.value instanceof InterfaceParser}>
              <TableOfContents>
                <>
                  <Show when={(namespaceOrMember.value as InterfaceParser).properties.length}>
                    <AsideList title='Properties' icon={<VsSymbolProperty class='h-6 w-auto' />}>
                      <For each={(namespaceOrMember.value as InterfaceParser).properties}>
                        {(propertyParser) => <AsideListItem name={propertyParser.name} />}
                      </For>
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

export default Namespace;
