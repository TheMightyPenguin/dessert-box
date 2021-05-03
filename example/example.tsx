import React from 'react';
import ReactDOM from 'react-dom';
import { createBox } from '../dist/index';
import { themeClass, atoms, usedProperties } from './atoms.css';

const Box = createBox(atoms, usedProperties);

const App = () => {
  return (
    <div className={themeClass}>
      <Box as="a" href="https://google.com" padding={{ desktop: 'extraLarge', mobile: 'small' }}>Hello</Box>
    </div>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <App />,
  container,
);
