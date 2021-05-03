# Dessert Box

> The last `<Box />` you'll ever need.

A `<Box />` component to consume atoms created with https://github.com/seek-oss/vanilla-extract and [`sprinkles`](https://github.com/seek-oss/vanilla-extract/tree/master/packages/sprinkles).

## Usage

Install the package:

```
$ npm install dessert-box
```

Have your atoms ready, and also export a flat array with all of the pieces that make up your atoms fn:

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

/**
 * Flat array including all property names used by our atoms
 */
export const usedProperties = [colorStyles, layoutStyles].flatMap((item) =>
  Object.keys(item)
);

export const atoms = createAtomsFn(responsiveStyles, colorStyles);
```

> Check `sprinkles` [docs](https://github.com/seek-oss/vanilla-extract/tree/3360bdfc9220024e7ffa49b3b198b72743d4e264/packages/sprinkles#setup) for more context into how to create these atoms.

Now let's create our `<Box />` using these atoms:

```jsx
const Box = createBox(atoms, usedProperties);

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

### TypeScript

This library is fully typed, and the component supports the `as` prop, and will properly type props based on the type of element we use and also based on our atoms.

Thanks to [`@radix-ui/react-polymorphic`](https://radix-ui.com/primitives/docs/utilities/polymorphic) for helping to achieve this :sparkles:.

### Running the example app

Run `npm install` then `npm run build` in the root folder (the one with this README file).

Then move into the example folder `cd example` and run `npm install` and `npm start`.
