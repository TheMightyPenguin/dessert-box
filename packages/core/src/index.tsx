export interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

type GetClassNameOptions = {
  className?: string;
  atomicClasses?: string;
  defaultClassName?: string;
};

export function getClassName({
  className,
  atomicClasses,
  defaultClassName,
}: GetClassNameOptions) {
  const classes = [
    defaultClassName,
    className,
    atomicClasses,
  ].filter(Boolean) as Array<string>;

  return classes.length === 0 ? undefined : classes.join(" ");
}

export function extractAtomsFromProps<AtomsFn extends AtomsFnBase>(
  props: any,
  atomsFn: AtomsFn
) {
  let hasAtomProps = false;
  let atomProps: Record<string, unknown> = {};
  let otherProps: Record<string, unknown> = {};

  for (const key in props) {
    if (atomsFn.properties.has(key)) {
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps };
}
