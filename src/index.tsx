import React from "react";
import type { CreateBoxParams } from "./types";

interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

type KeyOfSet<S extends Set<unknown>> = S extends Set<infer K> ? K : never;

export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  type BoxProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
  } & Parameters<AtomsFn>[0] &
    Omit<React.AllHTMLAttributes<HTMLElement>, "as" | "width" | "height">;

  const Box = React.forwardRef<HTMLElement, BoxProps>(
    ({ as: Element = "div", className, ...props }: BoxProps, ref) => {
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

  return Box;
}

export function createBoxWithAtomsProp<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  type BoxProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    atoms?: Parameters<AtomsFn>[0];
  } & Omit<React.AllHTMLAttributes<HTMLElement>, "as" | "width" | "height">;

  const Box = React.forwardRef<HTMLElement, BoxProps>(
    ({ as: Element = "div", className, atoms, ...props }, ref) => {
      const hasAtomProps = typeof atoms !== "undefined";

      return (
        <Element
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

  return Box;
}
