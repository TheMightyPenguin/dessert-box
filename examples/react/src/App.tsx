import React, { useRef } from 'react';
import { createBoxWithAtomsProp } from '@dessert-box/react';
import { themeClass, atoms } from './atoms.css';
import Box from './Box';
import Text from './Text/Text';
import Button from './Button/Button';

const BoxWithAtomsProp = createBoxWithAtomsProp({ atoms });

const AsBoxButton = (
  props: React.ComponentProps<typeof Box> & React.ComponentProps<typeof Button>,
) => <Box as={Button} {...props} />;

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box className={themeClass}>
      <AsBoxButton background="yellow" padding="extraLarge">
        Hello
      </AsBoxButton>
      <Box
        as="a"
        ref={ref}
        href="https://google.com"
        padding={{ desktop: 'extraLarge', mobile: 'small' }}
      >
        With atoms
      </Box>

      <Box>No props box</Box>
      <Text kind="h1">header 1 text</Text>
      <Text kind="h2">header 2 text</Text>
      <Text kind="p">paragraph text</Text>

      <Button size="md" kind="primary">
        Button
      </Button>

      <Button size="lg" kind="secondary">
        Button
      </Button>

      <Box
        as="a"
        href="https://google.com"
        padding={{ desktop: 'extraLarge', mobile: 'small' }}
        className="custom_class"
      >
        With atoms + className
      </Box>

      <Box>Without atoms or className</Box>

      <BoxWithAtomsProp
        as="a"
        href="https://google.com"
        atoms={{
          padding: { desktop: 'extraLarge', mobile: 'small' },
        }}
      >
        With atoms as a prop
      </BoxWithAtomsProp>
    </Box>
  );
};
