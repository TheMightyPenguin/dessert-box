export interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
  conditions: Set<string>;
  shorthands: Record<string, string[]>;
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
      // escape hatch
      const actualKey = key.substring(2);
      customProps[actualKey] = props[key];
    } else if (atomsFn.properties.has(key)) {
      // sprinkle prop
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else if (
      // reversed conditions props
      key[0] === '_' &&
      typeof props[key] !== null &&
      typeof props[key] === 'object' &&
      // atomsFn.conditions.has(key.substring(1)) &&
      Object.keys(props[key]).some(
        (prop) =>
          atomsFn.properties.has(prop) ||
          atomsFn.properties.has(prop.substring(2)),
      )
    ) {
      // TODO https://github.com/TheMightyPenguin/dessert-box/issues/18
      hasAtomProps = true;
      Object.keys(props[key]).forEach((prop) => {
        const conditionName = key.substring(1);
        const propValue = props[key][prop];
        const isEscapeHatchProp = prop[0] === '_' && prop[1] === '_';

        if (!isEscapeHatchProp) {
          // cant handle as of now `typeof atomProps[prop] === "string"` yet
          // cause we need the default condition name for that..
          if (typeof atomProps[prop] === 'object') {
            atomProps[prop] = {
              ...(atomProps[prop] as any),
              [conditionName]: propValue,
            };
          }
        }
      });
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps, customProps };
}
