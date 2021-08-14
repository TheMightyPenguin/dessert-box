import React from "react";
import type * as Polymorphic from "@radix-ui/react-polymorphic";
import type { CreateBoxParams } from "./types";

interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  type BoxProps = {
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    className?: string;
  } & Parameters<AtomsFn>[0];

  const Box = React.forwardRef<HTMLElement, BoxProps>(
    ({ as: Element = "div", className, ...props }, ref) => {
      let hasAtomProps = false;
      let atomProps: Record<string, unknown> = {};
      let otherProps: Record<string, unknown> = {};

      Object.entries(props).map(([name, value]) => {
        if (atomsFn.properties.has(name)) {
          hasAtomProps = true;
          atomProps[name] = value;
        } else {
          otherProps[name] = value;
        }
      });

      return (
        <Element
          ref={ref}
          {...otherProps}
          className={
            (hasAtomProps || className
              ? `${className ?? ""}${hasAtomProps && className ? " " : ""}${
                  hasAtomProps ? atomsFn(atomProps) : ""
                }`
              : undefined) + (defaultClassName ? ` ${defaultClassName}` : "")
          }
        />
      );
    }
  );

  return Box as Polymorphic.ForwardRefComponent<
    keyof JSX.IntrinsicElements,
    Omit<BoxProps, "as">
  >;
}

export function createBoxWithAtomsProp<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  type BoxProps = {
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    className?: string;
    atoms?: Parameters<AtomsFn>[0];
  };

  const Box = React.forwardRef<any, BoxProps>(
    ({ as: Element = "div", className, atoms, ...props }, ref) => {
      const hasAtomProps = typeof atoms !== "undefined";

      return (
        <Element
          // @ts-ignore
          {...props}
          ref={ref}
          className={
            (hasAtomProps || className
              ? `${className ?? ""}${hasAtomProps && className ? " " : ""}${
                  hasAtomProps ? atomsFn(atoms) : ""
                }`
              : undefined) + (defaultClassName ? ` ${defaultClassName}` : "")
          }
        />
      );
    }
  );

  return Box as Polymorphic.ForwardRefComponent<
    keyof JSX.IntrinsicElements,
    Omit<BoxProps, "as">
  >;
}
