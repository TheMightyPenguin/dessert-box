import React from "react";
import ReactDOM from "react-dom";
import { createBox, createBoxWithAtomsProp } from "../dist/index";
import { themeClass, atoms } from "./atoms.css";
import Box from "./Box";
import Text from "./Text";
import Button from "./Button";

const { Box: BoxWithAtomsProp } = createBoxWithAtomsProp({ atoms });

const AsBoxButton = (
  props: React.ComponentProps<typeof Box> & React.ComponentProps<typeof Button>
) => <Box as={Button} {...props} />;

const App = () => {
  const [el, setEl] = React.useState<HTMLElement>();
  return (
    <Box className={themeClass}>
      <AsBoxButton background="yellow" padding="extraLarge">
        Hello
      </AsBoxButton>
      <Box
        as="a"
        ref={setEl}
        href="https://google.com"
        padding={{ desktop: "extraLarge", mobile: "small" }}
      >
        With atoms
      </Box>

      <Text variant="h1">H1 text</Text>
      <Text variant="h2">H2 text</Text>
      <Text variant="p">p text</Text>

      <Button size="lg" variant="primary">
        Button
      </Button>

      <Button variant="secondary" size="lg">
        Button
      </Button>

      <Box
        as="a"
        href="https://google.com"
        padding={{ desktop: "extraLarge", mobile: "small" }}
        className="custom_class"
      >
        With atoms + className
      </Box>

      <Box>Without atoms or className</Box>

      <BoxWithAtomsProp
        as="a"
        href="https://google.com"
        atoms={{
          padding: { desktop: "extraLarge", mobile: "small" },
        }}
      >
        With atoms as a prop
      </BoxWithAtomsProp>
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);

ReactDOM.render(<App />, container);
