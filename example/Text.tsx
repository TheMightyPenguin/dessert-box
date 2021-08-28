import React from "react";
import { Box, createVariants } from "./Box";

const variants = createVariants({
  h1: {
    fontSize: "extraLarge",
    fontWeight: "600",
  },
  h2: {
    fontSize: "large",
    fontWeight: "400",
  },
  p: {
    fontSize: {
      desktop: "large",
      mobile: "medium",
    },
  },
});

type Props = {
  variant: keyof typeof variants;
  children: React.ReactNode;
};

const Text = ({ variant, children }: Props) => {
  return <Box {...variants[variant]}>{children}</Box>;
};

export default Text;
