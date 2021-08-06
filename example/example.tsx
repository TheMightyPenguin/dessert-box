import React from "react";
import ReactDOM from "react-dom";
import { createBox, createBoxWithAtomsProp } from "../dist/index";
import { themeClass, atoms } from "./atoms.css";

const Box = createBox({ atoms });
const BoxWithAtomsProp = createBoxWithAtomsProp({ atoms });

const App = () => {
  return (
    <Box className={themeClass}>
      <Box
        as="a"
        href="https://google.com"
        padding={{ desktop: "extraLarge", mobile: "small" }}
      >
        With atoms
      </Box>

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
