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

type EscapeHatchOverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]:
    | Extract<T[K], string | number>
    | {};
};

type WithConditionalProps<AtomsFn extends AtomsFnBase> = {
  [K in SetUnion<AtomsFn['conditions']> as `_${K}`]?: Partial<
    PickKnown<ResponsiveValue<AtomsFn, K>>
  >;
};

type ConditionalProperties<
  AtomsFn extends AtomsFnBase,
  TTokens = Tokens<AtomsFn>,
> = PickDefined<{
  [K in keyof TTokens]-?: Exclude<TTokens[K], string>;
}>;

type ResponsiveValue<
  AtomsFn extends AtomsFnBase,
  ConditionName extends SetUnion<AtomsFn['conditions']>,
> = {
  [Prop in keyof ConditionalProperties<AtomsFn>]: ConditionalProperties<AtomsFn>[Prop][ConditionName];
};

type Tokens<AtomsFn extends AtomsFnBase> = Parameters<AtomsFn>[0];
type TokensAndExtraProps<
  AtomsFn extends AtomsFnBase,
  TTokens = Tokens<AtomsFn>,
> = TTokens &
  EscapeHatchOverrideTokens<TTokens> &
  WithConditionalProps<AtomsFn>;

type BoxProps<
  AtomsFn extends AtomsFnBase,
  TType extends React.ElementType,
> = PolymorphicComponentProps<TType, TokensAndExtraProps<AtomsFn>>;

const defaultElement = 'div';
export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  const Box: <TType extends React.ElementType = typeof defaultElement>(
    props: BoxProps<AtomsFn, TType>,
  ) => null | ReactElement<BoxProps<AtomsFn, TType>> = forwardRef(
    <TType extends React.ElementType = typeof defaultElement>(
      { className, style, ...props }: BoxProps<AtomsFn, TType>,
      ref: ForwardedRef<PolymorphicComponent<BoxProps<AtomsFn, TType>, TType>>,
    ) => {
      const Element = props.as || defaultElement;
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
> = PolymorphicComponentProps<TType, { atoms?: TokensAndExtraProps<AtomsFn> }>;

export function createBoxWithAtomsProp<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  const Box: <TType extends React.ElementType = typeof defaultElement>(
    props: BoxWithAtomsProps<AtomsFn, TType>,
  ) => null | ReactElement = forwardRef(
    <TType extends React.ElementType = typeof defaultElement>(
      { className, style, atoms, ...props }: BoxWithAtomsProps<AtomsFn, TType>,
      ref: ForwardedRef<
        PolymorphicComponent<BoxWithAtomsProps<AtomsFn, TType>, TType>
      >,
    ) => {
      const Element = props.as || defaultElement;

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

type SetUnion<T> = T extends Set<infer U> ? U : never;
/**
 * remove all the never properties from a type object
 * @param T - object type
 * @see https://github.dev/ecyrbe/zodios/blob/999191988bb89620c383bef4b94972a761fea06d/src/utils.types.ts#L132-L140
 */
type PickDefined<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends never ? never : K }[keyof T]
>;

type PickKnown<T> = Pick<
  T,
  { [K in keyof T]: unknown extends T[K] ? never : K }[keyof T]
>;
