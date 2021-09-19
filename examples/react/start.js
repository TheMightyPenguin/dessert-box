const { vanillaExtractPlugin } = require('@vanilla-extract/esbuild-plugin');

require('esbuild').build({
  entryPoints: ['example.tsx'],
  bundle: true,
  plugins: [vanillaExtractPlugin()],
  outdir: 'dist',
  watch: true,
  sourcemap: true,
}).catch(() => process.exit(1))

