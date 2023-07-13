import {
  AtomsFnBase,
  composeClassNames,
  extractAtomsFromProps,
} from '@dessert-box/core';
import {
  ComponentProps,
  createMemo,
  JSX,
  ParentProps,
  splitProps,
  ValidComponent,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { CreateBoxParams } from './types';

export { styled } from './styled';

type AsProp<TType extends ValidComponent = ValidComponent> = {
  as?: TType;
};
type BaseBoxProps<TType extends ValidComponent> = AsProp<TType> &
  Omit<ComponentProps<TType>, keyof AsProp>;

type PolymorphicComponentProps<TType extends ValidComponent, Props> = Props &
  BaseBoxProps<TType>;

type OverrideTokens<T> = {
  [K in keyof T as K extends string ? `__${K}` : number]:
    | Extract<T[K], string | number>
    | {};
};

type Tokens<AtomsFn extends AtomsFnBase> = Parameters<AtomsFn>[0];
type BoxProps<
  AtomsFn extends AtomsFnBase,
  TType extends ValidComponent,
> = PolymorphicComponentProps<
  TType,
  Tokens<AtomsFn> & OverrideTokens<JSX.CSSProperties>
>;

type BoxWithAtomsProps<
  AtomsFn extends AtomsFnBase,
  TType extends ValidComponent,
> = PolymorphicComponentProps<
  TType,
  { atoms?: Tokens<AtomsFn> & OverrideTokens<Tokens<AtomsFn>> }
>;

let defaultElement = 'div';

export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  let Box = (
    props: ParentProps<
      {
        as?: ValidComponent;
        class?: string;
        style?: JSX.CSSProperties;
        ref?: HTMLElement;
        //atoms?: Tokens<AtomsFn> & OverrideTokens<Tokens<AtomsFn>>;
      } & BoxProps<AtomsFn, typeof defaultElement>
    >,
  ) => {
    let [local, others] = splitProps(props, ['as', 'class', 'style', 'ref']);
    let Element = local.as || defaultElement;

    let classProps = createMemo(() => extractAtomsFromProps(others, atomsFn));

    return (
      <Dynamic
        component={Element}
        ref={local.ref}
        style={{ ...local.style, ...classProps().customProps }}
        class={composeClassNames(
          local.class,
          atomsFn(classProps().atomProps),
          defaultClassName,
        )}
        {...classProps().otherProps}
      />
    );
  };

  return Box;
}

export function createBoxWithAtomsProp<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  let Box = (
    props: ParentProps<
      {
        as?: ValidComponent;
        class?: string;
        style?: JSX.CSSProperties;
        ref?: HTMLElement;
      } & BoxWithAtomsProps<AtomsFn, typeof defaultElement>
    >,
  ) => {
    let [local, others] = splitProps(props, ['as', 'class', 'ref', 'atoms']);
    let Element = local.as || defaultElement;

    return (
      <Dynamic
        component={Element}
        ref={local.ref}
        class={composeClassNames(
          local.class,
          atomsFn(local.atoms),
          defaultClassName,
        )}
        {...others}
      />
    );
  };

  return Box;
}
