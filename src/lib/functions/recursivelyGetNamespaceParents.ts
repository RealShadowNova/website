import { NamespaceParser, ProjectParser, type SearchResult } from 'typedoc-json-parser';

function getNamespaceParent(result: SearchResult, project: ProjectParser): NamespaceParser | null {
  return 'namespaceParentId' in result && result.namespaceParentId ? (project.find(result.namespaceParentId) as NamespaceParser | null) : null;
}

export function recursivelyGetNamespaceParents(result: SearchResult, project: ProjectParser): NamespaceParser[] {
  const parents: NamespaceParser[] = [];
  let parent = getNamespaceParent(result, project);

  while (parent) {
    parents.push(parent);
    parent = getNamespaceParent(parent, project);
  }

  return parents;
}
