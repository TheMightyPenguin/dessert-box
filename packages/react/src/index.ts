import {
  AtomsFnBase,
  composeClassNames,
  extractAtomsFromProps,
} from '@dessert-box/core';
import React, {
  createElement,
  ForwardedRef,
  forwardRef,
  ReactElement,
} from 'react';
import type { CreateBoxParams } from './types';

export { styled } from './styled';

// adapted from https://github.com/kripod/react-polymorphic-box
type AsProp<TType extends React.ElementType = React.ElementType> = {
  as?: TType;
};
type BaseBoxProps<TType extends React.ElementType> = AsProp<TType> &
  Omit<React.ComponentProps<TType>, keyof AsProp>;

type PolymorphicComponentProps<TType extends React.ElementType, Props> = Props &
  BaseBoxProps<TType>;

type PolymorphicComponent<
  Props,
  DefaultType extends React.ElementType = 'div',
> = <TType extends React.ElementType = DefaultType>(
  props: PolymorphicComponentProps<TType, Props>,
) => React.ReactElement | null;
//

type OverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]:
    | Extract<T[K], string | number>
    | {};
};

type Tokens<AtomsFn extends AtomsFnBase> = Parameters<AtomsFn>[0];
type BoxProps<
  AtomsFn extends AtomsFnBase,
  TType extends React.ElementType,
> = PolymorphicComponentProps<
  TType,
  Tokens<AtomsFn> & OverrideTokens<Tokens<AtomsFn>>
>;

const defaultElement = 'div';

export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  const Box: <TType extends React.ElementType = typeof defaultElement>(
    props: BoxProps<AtomsFn, TType>,
  ) => null | ReactElement<BoxProps<AtomsFn, TType>> = forwardRef(
    <TType extends React.ElementType = typeof defaultElement>(
      { className, style, as, ...props }: BoxProps<AtomsFn, TType>,
      ref: ForwardedRef<PolymorphicComponent<BoxProps<AtomsFn, TType>, TType>>,
    ) => {
      const Element = as || defaultElement;
      const { atomProps, customProps, otherProps } = extractAtomsFromProps(
        props,
        atomsFn,
      );

      return createElement(Element, {
        ref,
        style: { ...style, ...customProps },
        ...otherProps,
        className: composeClassNames(
          className,
          atomsFn(atomProps),
          defaultClassName,
        ),
      });
    },
  );

  (Box as any).displayName = 'DessertBox';

  return Box;
}

type BoxWithAtomsProps<
  AtomsFn extends AtomsFnBase,
  TType extends React.ElementType,
> = PolymorphicComponentProps<
  TType,
  { atoms?: Tokens<AtomsFn> & OverrideTokens<Tokens<AtomsFn>> }
>;

export function createBoxWithAtomsProp<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  const Box: <TType extends React.ElementType = typeof defaultElement>(
    props: BoxWithAtomsProps<AtomsFn, TType>,
  ) => null | ReactElement = forwardRef(
    <TType extends React.ElementType = typeof defaultElement>(
      {
        className,
        style,
        atoms,
        as,
        ...props
      }: BoxWithAtomsProps<AtomsFn, TType>,
      ref: ForwardedRef<
        PolymorphicComponent<BoxWithAtomsProps<AtomsFn, TType>, TType>
      >,
    ) => {
      const Element = as || defaultElement;

      return createElement(Element, {
        ref,
        ...props,
        className: composeClassNames(
          className,
          atomsFn(atoms),
          defaultClassName,
        ),
      });
    },
  );

  (Box as any).displayName = 'DessertBox';

  return Box;
}
