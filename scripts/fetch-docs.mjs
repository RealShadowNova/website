import { fetch } from '@sapphire/fetch';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ProjectParser } from 'typedoc-json-parser';

const contents = (await fetch('https://api.github.com/repos/RealShadowNova/docs/contents/docs')).filter((content) => content.type === 'dir');
const folders = await Promise.all(
  contents.map(async (content) => {
    const folderContents = await fetch(content.url);

    return Promise.all(
      folderContents.map(async (folderContent) => {
        if (folderContent.download_url === null) throw new Error('Folder content has no download url');

        const data = await fetch(folderContent.download_url);

        return new ProjectParser({ data, version: folderContent.name.replace('.json', '') });
      })
    );
  })
);

const directory = resolve(process.cwd(), 'src', 'assets', 'docs');

await rm(directory, { recursive: true, force: true });
await mkdir(directory, { recursive: true });

for (const projectParsers of folders) {
  const { name } = projectParsers[0];

  await mkdir(resolve(directory, name), { recursive: true });

  for (const projectParser of projectParsers) {
    await writeFile(resolve(directory, name, `${projectParser.version}.json`), JSON.stringify(projectParser.toJSON()), 'utf-8');
  }
}

await writeFile(
  resolve(directory, 'packages.json'),
  JSON.stringify(folders.map((projectParsers) => [projectParsers[0].name, projectParsers.map((projectParser) => projectParser.version)])),
  'utf-8'
);
