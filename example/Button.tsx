import React from "react";
import { Box, createVariants } from "./Box";

const variants = createVariants({
  primary: {
    background: "blue50",
  },
  secondary: {
    background: "yellow",
  },
});

// you can create as many variants as you want
const sizes = createVariants({
  md: {
    fontSize: "large",
    color: "blue50",
  },
  lg: {
    fontSize: "extraLarge",
  },
});

type Props = {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Button = ({
  children,
  size = "md",
  variant = "secondary",
}: Props) => {
  return (
    <Box as="button" {...sizes[size]} {...variants[variant]}>
      {children}
    </Box>
  );
};

export default Button;
