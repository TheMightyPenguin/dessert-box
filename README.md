# 🍰 Dessert Box

> Carefully packaged with sweets and atomic energy!

This library provides a zero-CSS-runtime `<Box />` component (similar to the one in [Braid](https://seek-oss.github.io/braid-design-system/components/Box) or [Chakra](https://chakra-ui.com/docs/layout/box)).

This works by consuming atoms created with [`vanilla-extract`](https://github.com/seek-oss/vanilla-extract) and [`sprinkles`](https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles). Shout out to the team at Seek for making these awesome libraries!

Step 1, create your box:

```jsx
// Box.tsx
import { createBox } from 'dessert-box';

const Box = createBox({ atoms });

export default Box
```

Step 2, enjoy the sweetness:

```jsx
// OtherFileOrComponent.tsx
import Box from './Box.ts'

const MyComponent = () => {
  return (
    <Box padding="large">
      What a sweet treat!
    </Box>
  )
}
```

![dessert-box](https://img.shields.io/bundlephobia/minzip/dessert-box.svg)

- [🍰 Dessert Box](#-dessert-box)
  - [Usage](#usage)
  - [API](#api)
    - [createBox(options: { atoms: AtomsFn, defaultClassName?: string })](#createboxoptions--atoms-atomsfn-defaultclassname-string-)
    - [createBoxWithAtomsProp(options: { atoms: AtomsFn, defaultClassName?: string })](#createboxwithatomspropoptions--atoms-atomsfn-defaultclassname-string-)
  - [TypeScript](#typescript)
  - [Running the example app](#running-the-example-app)
  - [How does it work?](#how-does-it-work)
  - [Thanks](#thanks)

[Try it on CodeSandbox!](https://codesandbox.io/s/dessert-box-demo-wxgy8?file=/src/App.tsx)

## Usage

Install the package:

```
$ npm install dessert-box
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

const responsiveStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  properties: {
    padding: space,
    // ...
  },
  // ...
});

const colorStyles = createAtomicStyles({
  // ...
});

export const atoms = createAtomsFn(responsiveStyles, colorStyles);
```

> Check `sprinkles` [docs](https://github.com/seek-oss/vanilla-extract/tree/3360bdfc9220024e7ffa49b3b198b72743d4e264/packages/sprinkles#setup) for more context into how to create these atoms.

Now let's create our `<Box />` using these atoms:

```jsx
// yourApp.ts
import { createBox } from 'dessert-box';
const Box = createBox({ atoms });

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

## API

### createBox(options: { atoms: AtomsFn, defaultClassName?: string }) 

Creates a `<Box />` component that takes atoms at the root level.

```jsx
import { createBox } from 'dessert-box';
import { atoms } from './atoms.css';

const box = createBox({ atoms });

<Box padding="small" />
```

### createBoxWithAtomsProp(options: { atoms: AtomsFn, defaultClassName?: string })

Creates a `<Box />` component that takes atoms as a prop called `atoms`.

```jsx
import { createBoxWithAtomsProp } from 'dessert-box';
import { atoms } from './atoms.css';

const Box = createBoxWithAtomsProp({ atoms });

<Box atoms={{ padding: 'small' }} />
```

## TypeScript

This library is fully typed, and the component supports the `as` prop, and will properly type props based on the type of element we use and also based on our atoms.

## Running the example app

Run `npm install` then `npm run build` in the root folder (the one with this README file).

Then move into the example folder `cd example` and run `npm install` and `npm start`.

## How does it work?

This works by depending on build-time generated CSS by [sprinkles](https://github.com/seek-oss/vanilla-extract/tree/3360bdfc9220024e7ffa49b3b198b72743d4e264/packages/sprinkles), and then using the `atomsFn` function to lookup classNames in runtime. So it does have a runtime footprint, but should be pretty minimal. I'm still experimenting to see if it's possible to remove that, but other approaches may lead to other constraints or similar runtime.

## Thanks

- Thanks to the team at Seek for [vanilla-extract](https://github.com/seek-oss/vanilla-extract) and [`sprinkles`](https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles), this would not be possible without these great libs and the technical feats they accomplish.
- Thanks to the team at Modulz for [`@radix-ui/react-polymorphic`](https://radix-ui.com/primitives/docs/utilities/polymorphic). The component offers a great typed experience thanks to this.
