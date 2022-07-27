import { useParams } from '@solidjs/router';
import { Show, createEffect, createResource, type Component } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { PageLayout } from '../../../../../components/PageLayout/PageLayout';
import { FunctionModel } from '../../../../../components/models/FunctionModel';

const Function: Component = () => {
  const params = useParams();
  const [parser, { refetch }] = createResource(async () => {
    const data = (await import(`../../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.JSON | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    const projectParser = new ProjectParser({ data });
    const parser = projectParser.functions.find((functionParser) => functionParser.name === params.function);

    if (parser === undefined) {
      throw new Error(`Type alias '${params.function}' not found.`);
    }

    console.log(parser.signatures);

    return parser;
  });

  createEffect(() => {
    params.function;

    void refetch();
  });

  return (
    <PageLayout>
      <div class='flex flex-col gap-4 h-full'>
        <Show when={parser()} fallback={<div class='flex flex-row place-content-center place-items-center h-full'>Loading...</div>} keyed>
          {(parser) => <FunctionModel function={parser} />}
        </Show>
      </div>
    </PageLayout>
  );
};

export default Function;
