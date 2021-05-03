import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

export function createBox<AtomsFn extends (...args: any) => string>(atomsFn: AtomsFn, usedProperties: string[]) {
  type BoxProps = {
    as?: JSX.IntrinsicElements;
    children: any;
  } & Parameters<AtomsFn>[0];

  const usedPropertiesSet = new Set(usedProperties);

  function Box({ as: Element = 'div', children, ...props }: BoxProps) {
    let atomProps = {};
    let otherProps = {};

    Object.entries(props).map(([name, value]) => {
      if (usedPropertiesSet.has(name)) {
        // @ts-ignore
        atomProps[name] = value;
      } else {
        // @ts-ignore
        otherProps[name] = value;
      }
    });

    return <Element {...otherProps} className={atomsFn(atomProps)}>{children}</Element>
  }

  return Box as Polymorphic.ForwardRefComponent<'div', Omit<BoxProps, 'as'>>;
}
