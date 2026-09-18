import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const outputDir = path.join(publicDir, 'mobile');

const sourceFiles = [
  'SUPER.png',
  'tes 2.png',
  'POCT.png',
  'Graphene.png',
  'SERS.png',
  'go w.png',
  'MICRO.png',
  'SE.png',
  'IMP.png',
  'TENG.png',
  'GNR.png',
  'TENG_W.png',

  '1.png',
  '2.png',
  '3.jpg',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
];

function makeOutputName(filename) {
  const extension = path.extname(filename);

  const name = path
    .basename(filename, extension)
    .replace(/\s+/g, '-');

  return `${name}.webp`;
}

await fs.rm(outputDir, {
  recursive: true,
  force: true,
});

await fs.mkdir(outputDir, {
  recursive: true,
});

console.log('Generating mobile images...');

for (const filename of sourceFiles) {
  const input = path.join(
    publicDir,
    filename
  );

  const outputName =
    makeOutputName(filename);

  const output = path.join(
    outputDir,
    outputName
  );

  try {
    await fs.access(input);
  } catch {
    console.warn(
      `Image not found: ${filename}`
    );

    continue;
  }

  await sharp(input)
    .rotate()
    .resize({
      width: 720,
      withoutEnlargement: true,
      fit: 'inside',
    })
    .webp({
      quality: 48,
      effort: 6,
    })
    .toFile(output);

  const info =
    await fs.stat(output);

  console.log(
    `${filename} -> mobile/${outputName} (${Math.round(
      info.size / 1024
    )} KB)`
  );
}

console.log(
  'Mobile images generated successfully.'
);
