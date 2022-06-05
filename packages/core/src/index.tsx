export interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

export function composeClassNames(...classNames: Array<string | undefined>) {
  const classes = classNames
    .filter((className) => {
      return Boolean(className) && className !== ' ';
    })
    .map((className) => {
      return className?.toString().trim();
    }) as Array<string>;
  return classes.length === 0 ? undefined : classes.join(' ');
}

export function extractAtomsFromProps<AtomsFn extends AtomsFnBase>(
  props: any,
  atomsFn: AtomsFn,
) {
  let hasAtomProps = false;
  let atomProps: Record<string, unknown> = {};
  let otherProps: Record<string, unknown> = {};
  let customProps: Record<string, unknown> = {};

  for (const key in props) {
    if (key[0] === '_' && key[1] === '_') {
      const actualKey = key.substring(2);
      customProps[actualKey] = props[key];
    } else if (atomsFn.properties.has(key)) {
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps, customProps };
}
