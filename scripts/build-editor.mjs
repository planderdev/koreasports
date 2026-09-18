import { build, context } from "esbuild";
import { readdir, unlink } from "node:fs/promises";
import { resolve, basename } from "node:path";
const outputDirectory = resolve("assets/js/generated");
const options = {
  entryPoints: [
    "assets/js/editor/rich-editor.js",
    "assets/js/editor/body-adapter.js",
    "assets/js/editor/public-body.js",
  ],
  outdir: outputDirectory,
  bundle: true,
  format: "esm",
  splitting: true,
  minify: true,
  target: "es2022",
  legalComments: "eof",
  metafile: true,
};
if (process.argv.includes("--watch")) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  const result = await build(options);
  const outputs = new Set(
    Object.keys(result.metafile.outputs).map((name) => basename(name)),
  );
  for (const name of await readdir(outputDirectory)) {
    if (/^chunk-[\w-]+\.js$/.test(name) && !outputs.has(name))
      await unlink(resolve(outputDirectory, name));
  }
}
