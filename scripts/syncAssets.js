import fs from 'fs';
import path from 'path';

const root = process.cwd();

const copies = [
  {
    from: path.join(root, 'mcd-docs', 'dgs_materialer'),
    to: path.join(root, 'public', 'dgs_materialer'),
  },
  {
    from: path.join(root, 'mcd-docs', 'dgs_materialer', 'dishes'),
    to: path.join(root, 'public', 'dishes'),
  },
  {
    from: path.join(root, 'mcd-docs', 'dgs_materialer', 'employees'),
    to: path.join(root, 'public', 'employees'),
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function copyDir(src, dest) {
  try {
    const stat = await fs.promises.stat(src);
    if (!stat.isDirectory()) return;
  } catch (e) {
    return;
  }

  await ensureDir(dest);
  const files = await fs.promises.readdir(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const st = await fs.promises.stat(srcPath);
    if (st.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
      console.log(`Copied ${srcPath} -> ${destPath}`);
    }
  }
}

async function run() {
  for (const item of copies) {
    await copyDir(item.from, item.to);
  }
  console.log('Asset sync complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
