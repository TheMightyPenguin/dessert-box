import React from 'react';
import ReactDOM from 'react-dom';
import { createBox } from '../dist/index';
import { themeClass, atoms, usedProperties } from './atoms.css';

const Box = createBox(atoms, usedProperties);

const App = () => {
  return (
    <Box className={themeClass}>
      <Box
        as="a"
        href="https://google.com"
        padding={{ desktop: 'extraLarge', mobile: 'small' }}
      >
        With atoms
      </Box>

      <Box
        as="a"
        href="https://google.com"
        padding={{ desktop: 'extraLarge', mobile: 'small' }}
        className="custom_class"
      >
        With atoms + className
      </Box>

      <Box>Without atoms or className</Box>
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <App />,
  container,
);
