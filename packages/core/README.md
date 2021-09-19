# 🍰 Dessert Box

A library to easily consume your design tokens from a React component, meant to be used with [vanilla-extract][vanilla-extract].

This library will make consuming your [sprinkles][sprinkles] from a react component a breeze. It provides a zero-CSS-runtime `<Box />` component (similar to the one in [Braid](https://seek-oss.github.io/braid-design-system/components/Box) or [Chakra](https://chakra-ui.com/docs/layout/box)).

[Try it on CodeSandbox!](https://codesandbox.io/s/dessert-box-demo-wxgy8?file=/src/App.tsx)

It works by consuming `atoms` created with [`vanilla-extract`][vanilla-extract]) and [`sprinkles`][sprinkles]. Shout out to the team at Seek for making these awesome libraries!

1. Step 1, create your Box with your `atoms` created with sprinkles:

```tsx
// Box.tsx
import { createBox } from '@dessert-box/react';
import { atoms } from './sprinkles.css';

const { Box } = createBox({
  atoms,
  // optional: pass your CSS reset className here
  // useful if you want to scope your reset to your Box element
  defaultClassName: 'resetClassName'
});

export default Box
```

2. Step 2, import it enjoy the sweetness:

```tsx
// OtherFileOrComponent.tsx
import Box from './Box'

const MyComponent = () => {
  return (
    <Box padding="large">
      What a sweet treat!
    </Box>
  )
}
```

**Wondering why using a Box component may be a good idea? or what is a Box component? Check the [FAQ](#FAQ).**

> Wondering how to use `variants` with this library? Check out the [variants](#variants) section.

![dessert-box](https://img.shields.io/bundlephobia/minzip/dessert-box.svg)

- [🍰 Dessert Box](#-dessert-box)
	- [Usage](#usage)
		- [Variants](#variants)
	- [API](#api)
		- [createBox(options: { atoms: AtomsFn, defaultClassName?: string })](#createboxoptions--atoms-atomsfn-defaultclassname-string-)
		- [createBoxWithAtomsProp(options: { atoms: AtomsFn, defaultClassName?: string })](#createboxwithatomspropoptions--atoms-atomsfn-defaultclassname-string-)
	- [Running the example app](#running-the-example-app)
	- [How does it work?](#how-does-it-work)
	- [Thanks](#thanks)
	- [FAQ](#faq)

[Try it on CodeSandbox!](https://codesandbox.io/s/dessert-box-demo-wxgy8?file=/src/App.tsx)

## Usage

Install the package:

```
$ npm install @dessert-box/react
```

Configure [vanilla-extract](https://github.com/seek-oss/vanilla-extract) and [`sprinkles`](https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles) and have your atoms ready:

```js
// atoms.css.ts
import { createAtomicStyles, createAtomsFn } from "@vanilla-extract/sprinkles";

const space = {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
};

const colors = {
  primary: 'blue',
  // ...
}

const atomicStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  properties: {
    padding: space,
    backgroundColor: colors,
    // ...
  },
  // ...
});

export const atoms = createAtomsFn(atomicStyles);
```

> Check `sprinkles` [docs](https://github.com/seek-oss/vanilla-extract/tree/3360bdfc9220024e7ffa49b3b198b72743d4e264/packages/sprinkles#setup) for more context into how to create these atoms.

Now let's create our `<Box />` using these atoms:

```tsx
// Box.ts
import { createBox } from '@dessert-box/react';
import { atoms } from './sprinkles.css';

const { Box } = createBox({ atoms });

export default Box
```

```tsx
// otherFile.tsx
import Box from './Box';

const App = () => {
  return <Box padding="large">Hello</Box>;
};
```

Notice we can pass every property, shorthand, or condition we can normally pass to our `atomsFn` function. For example, we could leverage the conditions for responsive design we have here:

```jsx
<Box padding={{ mobile: "none", tablet: "small", desktop: "large" }} />
```

If you need to render a tag different than a `div`, you can use the `as` prop:

```jsx
<Box as="a" href="https://example.com" padding="small">
  Link to example
</Box>
```

[Try it on CodeSandbox!](https://codesandbox.io/s/dessert-box-demo-wxgy8?file=/src/App.tsx)

### Variants

The official [@vanilla-extract/recipes][recipes] package has an excelent API for dealing with variants, this can be combined with our `Box` component to create [variant-based components](https://ped.ro/blog/variant-driven-components):

NOTE: (Assuming you already have created your `Box` component following the example above).

1. First define your recipe using the `recipe` function:

```tsx
// Button.css.ts
import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "../atoms.css";

export const buttonRecipe = recipe({
  variants: {
    kind: {
      primary: atoms({ background: "blue50" }),
      secondary: atoms({ background: "yellow" }),
    },
    size: {
      md: atoms({ fontSize: "large" }),
      lg: atoms({ fontSize: "extraLarge" }),
    },
  },
});

export type ButtonVariants = Parameters<typeof buttonRecipe>[0];
```

2. Then use the `recipes` function to create variants and apply them to your `Box`:

```tsx
// Button.tsx
import { Box } from "./Box"
import { buttonRecipe, ButtonVariants } from "./Button.css";

type Props = {
  children: React.ReactNode;
} & ButtonVariants;

export const Button = ({
  children,
  size = 'md',
  kind = 'secondary',
}: Props) => {
  return (
    <Box as="button" className={buttonRecipe({ size, kind })}>
      {children}
    </Box>
  )
}

export default Button;
```

For more context, refer to [@vanilla-extract/recipe][recipes] or feel free [to open an issue in this project](https://github.com/TheMightyPenguin/dessert-box/issues/new) if the integration is not working as you'd expect!

## API

### createBox(options: { atoms: AtomsFn, defaultClassName?: string })

Creates a `<Box />` component that takes atoms at the root level.

```jsx
import { createBox } from '@dessert-box/react';
import { atoms } from './atoms.css';

const Box = createBox({ atoms });

<Box padding="small" />
```

### createBoxWithAtomsProp(options: { atoms: AtomsFn, defaultClassName?: string })

Creates a `<Box />` component that takes atoms as a prop called `atoms`.

```jsx
import { createBoxWithAtomsProp } from '@dessert-box/react';
import { atoms } from './atoms.css';

const Box = createBoxWithAtomsProp({ atoms });

<Box atoms={{ padding: 'small' }} />
```

## Running the example app

Run `npm install` then `npm run build` in the root folder (the one with this README file).

Then move into the example folder `cd example` and run `npm install` and `npm start`.

## How does it work?

This works by depending on build-time generated CSS by [sprinkles](https://github.com/seek-oss/vanilla-extract/tree/3360bdfc9220024e7ffa49b3b198b72743d4e264/packages/sprinkles), and then using the `atomsFn` function to lookup classNames in runtime. So it does have a runtime footprint, but should be pretty minimal. I'm still experimenting to see if it's possible to remove that, but other approaches may lead to other constraints or similar runtime.

## Thanks

- Thanks to the team at Seek for [vanilla-extract](https://github.com/seek-oss/vanilla-extract) and [`sprinkles`](https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles), this would not be possible without these great libs and the technical feats they accomplish.

## FAQ

* What is a Box component?

> It's a generic element that allows you to prototype fast and takes a variety of styling props (think of exposing a lot of CSS attributes as props on a component).

* Why should I use a Box component?

> There are many versions and flavors of a Box component, some are more [flexible](https://chakra-ui.com/docs/layout/box), while others are more [restrictive](https://seek-oss.github.io/braid-design-system/components/Box). The Box in this library falls into the latter category (restrictive), and it's more geared towards being the a lower level API of your Design System (or serving as inspiration for it).

This Box component is meant to be used as a primitive for consuming design tokens, giving you a nice balance between flexibility and constraints. You can use it as an lower level API to implement your other components (Buttons, Card, Layout components, ...), and also as a prototyping and general usage component:

* As a prototyping tool, it allows you to use all of your design tokens to generate new designs and evaluate if you need to iterate on your foundations, or to validate if they work for your use cases.
* For general usage you can still have the guarantee that users of your system won't do anything impossible (e.g.: using a value that is not part of the design tokens) but still have a productive experience working on UI.

[sprinkles]: https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles
[vanilla-extract]: https://github.com/seek-oss/vanilla-extract
[recipes]: https://github.com/seek-oss/vanilla-extract#recipes-api
