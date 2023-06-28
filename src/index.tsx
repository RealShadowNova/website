import { render } from 'solid-js/web';
import {
  ClassParser,
  EnumParser,
  FunctionParser,
  InterfaceParser,
  NamespaceParser,
  ReferenceTypeParser,
  TypeAliasParser,
  TypeParameterParser,
  VariableParser
} from 'typedoc-json-parser';
import App from './App';
import './index.css';
import { recursivelyGetNamespaceParents } from './lib/functions/recursivelyGetNamespaceParents';

const references: Record<string, string> = {
  // MDN
  BigInt64Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array',
  Blob: 'https://developer.mozilla.org/en-US/docs/Web/API/Blob',
  Date: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
  _DOMEventTarget: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget',
  Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
  Float32Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array',
  Float64Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array',
  Function: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
  Int16Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array',
  Int32Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array',
  Int8Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array',
  Iterable: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol',
  Iterator: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol',
  Map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
  Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
  Response: 'https://developer.mozilla.org/en-US/docs/Web/API/Response',
  Set: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
  URL: 'https://developer.mozilla.org/en-US/docs/Web/API/URL',

  // Node.js
  'global.Buffer': 'https://nodejs.org/api/buffer.html',
  '__global.Buffer': 'https://nodejs.org/api/buffer.html',
  EventEmitter: 'https://nodejs.org/api/events.html#events_class_eventemitter',
  'global.NodeJS.EventEmitter': 'https://nodejs.org/api/events.html#events_class_eventemitter',
  '__global.NodeJS.EventEmitter': 'https://nodejs.org/api/events.html#events_class_eventemitter',
  'EventEmitter.captureRejectionSymbol': 'https://nodejs.org/api/events.html#eventscapturerejectionsymbol',
  'EventEmitter.errorMonitor': 'https://nodejs.org/api/events.html#eventserrormonitor',
  NodeEventTarget: 'https://nodejs.org/api/events.html#class-nodeeventtarget',
  PathLike: 'https://nodejs.org/api/path.html#path_pathlike',
  '"fs".PathLike': 'https://nodejs.org/api/path.html#path_pathlike',
  'global.NodeJS.Timeout': 'https://nodejs.org/api/timers.html#timers_class_timeout',
  '__global.NodeJS.Timeout': 'https://nodejs.org/api/timers.html#timers_class_timeout',
  'global.NodeJS.Timer': 'https://nodejs.org/api/timers.html#timers_class_timeout',
  '__global.NodeJS.Timer': 'https://nodejs.org/api/timers.html#timers_class_timeout',
  'internal.Stream': 'https://nodejs.org/api/stream.html#stream_class_stream',

  // TypeScript
  Exclude: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers',
  InstanceType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetype',
  Omit: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
  Partial: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Readonly: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
  Record: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type'
};

const unknownReferences: Set<string> = new Set([
  // 'typescript'
  'ArrayLike',
  'AsyncIterableIterator',
  'ClassDecorator',
  'DOMEventTarget',
  'InspectOptionsStylized',
  'IterableIterator',
  'IteratorResult',
  'MapConstructor',
  'MethodDecorator',
  'PropertyKey',
  'ObjectConstructor',
  'ReadonlyMap',

  // '@types/node'
  'StaticEventEmitterOptions'
]);

ReferenceTypeParser.formatToString = (options) => {
  const { parser, project } = options;
  const typeArguments =
    parser.typeArguments.length > 0
      ? `<${parser.typeArguments.map((type) => (project ? type.toString(project) : type.toString())).join(', ')}\\>`
      : '';

  if (parser.id && parser.id > 0 && project) {
    const result = project.find(parser.id);

    if (result) {
      if (result instanceof TypeParameterParser) return `\`${parser.name}\`${typeArguments}`;
      if ('external' in result && !result.external) {
        const parents = recursivelyGetNamespaceParents(result, project);

        if (result instanceof NamespaceParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/namespace/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof ClassParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/class/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof FunctionParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/function/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof InterfaceParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/interface/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof EnumParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/enum/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof TypeAliasParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/type-alias/${parser.name}">${parser.name}</a>${typeArguments}`;
        } else if (result instanceof VariableParser) {
          return `<a href="/docs/${project.name}/${project.version}/${parents
            .reverse()
            .map((parent) => `namespace/${parent.name}/`)
            .join('/')}/variable/${parser.name}">${parser.name}</a>${typeArguments}`;
        }
      }
    } else {
      console.warn(`[WARN] Unable to find parser for ${parser.name} (${parser.id})`);
    }
  }

  for (const [ref, url] of Object.entries(references)) {
    if (ref === parser.name) return `<a href="${url}">${parser.name}</a>${typeArguments}`;
  }

  if (!unknownReferences.has(parser.name)) console.warn(`'[WARN]' Unable to find parser for ${parser.name} (${parser.packageName})`);

  return `[${parser.name}](${parser.id ?? parser.packageName})${typeArguments}`;
};

render(() => <App />, document.getElementById('root')!);

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: Accessor<boolean>;
    }
  }
}
