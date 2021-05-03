import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

export function createBox<AtomsFn extends (...args: any[]) => string>(atomsFn: AtomsFn, usedProperties: string[]) {
  type BoxProps = {
    as?: keyof JSX.IntrinsicElements;
    children: any;
  } & Parameters<AtomsFn>[0];

  const usedPropertiesSet = new Set(usedProperties);

  function Box({ as: Element = 'div', children, ...props }: BoxProps) {
    let atomProps: Record<string, unknown> = {};
    let otherProps: Record<string, unknown> = {};

    Object.entries(props).map(([name, value]) => {
      if (usedPropertiesSet.has(name)) {
        atomProps[name] = value;
      } else {
        otherProps[name] = value;
      }
    });

    return <Element {...otherProps} className={atomsFn(atomProps)}>{children}</Element>
  }

  return Box as Polymorphic.ForwardRefComponent<'div', Omit<BoxProps, 'as'>>;
}
