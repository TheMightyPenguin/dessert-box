import { recipe } from '@vanilla-extract/recipes';
import { atoms } from '../atoms.css';

export const textRecipe = recipe({
  variants: {
    kind: {
      h1: atoms({
        fontSize: 'extraLarge',
        fontWeight: '600',
      }),
      h2: atoms({
        fontSize: 'large',
        fontWeight: '400',
      }),
      p: atoms({
        fontSize: 'medium',
      }),
    },
  },
});

export type TextVariants = Parameters<typeof textRecipe>[0];
