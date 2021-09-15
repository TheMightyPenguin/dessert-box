import React from "react";
import { buttonRecipe, ButtonVariants } from "./Button.css";
import { Box } from "../Box";

type Props = {
  children: React.ReactNode;
} & ButtonVariants;

export const Button = ({
  children,
  size = "md",
  kind = "secondary",
}: Props) => {
  return (
    <Box as="button" className={buttonRecipe({ size, kind })}>
      {children}
    </Box>
  );
};

export default Button;
