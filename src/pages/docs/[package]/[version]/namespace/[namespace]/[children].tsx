import { useParams } from '@solidjs/router';
import { createResource, type Component } from 'solid-js';
import { NamespaceParser, ProjectParser } from 'typedoc-json-parser';

const Children: Component = () => {
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

    const children = params.children.matchAll(/(?<type>namespace|class|enum|function|interface|typeAlias|variable)\/(?<name>[A-Za-z]+)\/?/g);
    let parser: NamespaceParser = namespaceParser;

    for (const child of children) {
      if (child.groups!.type === 'namespace') {
        const result = parser.namespaces.find((namespaceParser) => namespaceParser.name === child.groups!.name);

        if (result === undefined) {
          throw new Error(`Namespace '${child.groups!.name}' not found.`);
        }

        parser = result;
      }
    }
  });
};
