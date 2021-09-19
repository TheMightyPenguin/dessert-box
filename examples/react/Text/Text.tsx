import React from "react";
import { textRecipe, TextVariants } from "./Text.css";
import { Box } from "../Box";

type Props = {
  children: React.ReactNode;
} & TextVariants;

const Text = ({ kind, children }: Props) => {
  return <Box className={textRecipe({ kind })}>{children}</Box>;
};

export default Text;
