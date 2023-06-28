import { createResource } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';

const importPackagesData = async (): Promise<PackageData[]> => {
  const packages = (await import('../assets/docs/packages.json')).default as [string, string[]][] | undefined;

  if (packages === undefined) {
    throw new Error("'assets/docs/packages.json' does not exist. Please run 'yarn fetch-docs' to generate the documentation.");
  }

  const packagesData = [];

  for (const [name, versions] of packages) {
    const packageData: PackageDataJSON = {
      name,

      packages: []
    };

    for (const version of versions) {
      const data = (await import(`../assets/docs/${name}/${version}.json`)).default as ProjectParser.Json | undefined;

      if (data === undefined) {
        throw new Error(`'assets/docs/${name}/${version}.json' does not exist. Please run 'yarn fetch-docs' to generate the documentation.`);
      }

      packageData.packages.push(data);
    }

    packagesData.push(packageData);
  }

  return packagesData.map((packageData) => ({ name: packageData.name, packages: packageData.packages.map((data) => new ProjectParser({ data })) }));
};

export const packagesData = createResource(importPackagesData)[0];

export interface PackageData {
  name: string;

  packages: ProjectParser[];
}

export interface PackageDataJSON {
  name: string;

  packages: ProjectParser.Json[];
}
