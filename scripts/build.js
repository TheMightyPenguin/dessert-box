const { vanillaExtractPlugin } = require('@vanilla-extract/esbuild-plugin');
const pkg = require('../package.json');

require('esbuild').build({
  entryPoints: ['index.tsx'],
  bundle: true,
  plugins: [vanillaExtractPlugin()],
  outdir: 'dist',
  sourcemap: true,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),

  ]
}).catch(() => process.exit(1))
