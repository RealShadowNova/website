import { useParams } from '@solidjs/router';
import { createMemo, type Component } from 'solid-js';
import { ClassParser, EnumParser, FunctionParser, InterfaceParser, NamespaceParser, TypeAliasParser, VariableParser } from 'typedoc-json-parser';
import { recursivelyGetNamespaceParents } from '../lib/functions/recursivelyGetNamespaceParents';
import { packagesData } from '../resources/packagesData';

export const Content: Component<ContentProps> = (props) => {
  const params = useParams();
  const project = createMemo(() =>
    packagesData()
      ?.find((packageData) => packageData.name === params.package)
      ?.packages?.find((project) => project.version === params.version)
  );

  const content = createMemo(() =>
    props.content
      .replace(/\[(?<name>\D+)\]\((?<id>\d+)\)/gm, (match, name, id) => {
        const result = project()?.find(Number(id));

        if (result) {
          const parents = recursivelyGetNamespaceParents(result, project()!);

          if (result instanceof NamespaceParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/namespace/${name}">${name}</a>`;
          } else if (result instanceof ClassParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/class/${name}">${name}</a>`;
          } else if (result instanceof FunctionParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/function/${name}">${name}</a>`;
          } else if (result instanceof InterfaceParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/interface/${name}">${name}</a>`;
          } else if (result instanceof EnumParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/enum/${name}">${name}</a>`;
          } else if (result instanceof TypeAliasParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/type-alias/${name}">${name}</a>`;
          } else if (result instanceof VariableParser) {
            return `<a href="/docs/${project()?.name}/${project()?.version}/${parents
              .reverse()
              .map((parent) => `namespace/${parent.name}`)
              .join('/')}/variable/${name}">${name}</a>`;
          }
        }

        return match;
      })
      .replace(/\[(?<name>\D+)\]\((?<package>\D+)\)/gm, (match, _name, _packageName) => {
        return match;
      })
      .replace(/`(?<code>.[^`]+)`/gm, (_match, code) => {
        return `<code class="font-mono">${code}</code>`;
      })
  );

  return <span class='content' innerHTML={content()} />;
};

interface ContentProps {
  content: string;
}
