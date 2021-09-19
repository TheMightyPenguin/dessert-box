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
