import { useParams } from '@solidjs/router';
import { Show, createEffect, createResource, type Component } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { PageLayout } from '../../../../../components/PageLayout/PageLayout';
import { TypeAliasModel } from '../../../../../components/models/TypeAliasModel';

const TypeAlias: Component = () => {
  const params = useParams();
  const [parser, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.JSON | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const parser = projectParser.typeAliases.find((typeAliasParser) => typeAliasParser.name === params.typeAlias);

    if (parser === undefined) {
      throw new Error(`Type alias '${params.typeAlias}' not found.`);
    }

    return parser;
  });

  createEffect(() => {
    params.typeAlias;

    void refetch();
  });

  return (
    <PageLayout>
      <div class='flex flex-col gap-4 h-full'>
        <Show when={parser()} fallback={<div class='flex flex-row place-content-center place-items-center h-full'>Loading...</div>} keyed>
          {(parser) => <TypeAliasModel typeAlias={parser} />}
        </Show>
      </div>
    </PageLayout>
  );
};

export default TypeAlias;
