const pkg = require('../package.json');

require('esbuild').build({
  entryPoints: ['index.tsx'],
  bundle: true,
  outdir: 'dist',
  sourcemap: true,
  format: 'cjs',
  target: ['es2019'],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}).catch(() => process.exit(1))
