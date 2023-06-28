import { useParams } from '@solidjs/router';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { Show, createResource, type Component } from 'solid-js';
import type { ProjectParser } from 'typedoc-json-parser';
import { PageLayout } from '../../../../components/PageLayout/PageLayout';

const Default: Component = () => {
  const params = useParams();
  const [readme] = createResource(async () => {
    const data = (await import(`../../../../assets/docs/${params.package}/${params.version}.json`)).default as ProjectParser.JSON | undefined;

    if (data === undefined) {
      throw new Error(
        `'assets/docs/${params.package}/${params.version}.json' not found. Please run 'yarn fetch-docs' to generate the documentation.`
      );
    }

    return data.readme ?? null;
  });

  const md = new MarkdownIt({ html: true, breaks: true, highlight: (str, lang) => hljs.highlight(str, { language: lang }).value });

  return (
    <PageLayout>
      <Show when={readme()} keyed>
        {(readme: string) => <div class='markdown' innerHTML={md.render(readme)} />}
      </Show>
    </PageLayout>
  );
};

export default Default;
