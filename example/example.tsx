import { createBox } from '..';
import { themeClass, atoms, usedProperties } from './atoms.css';

const Box = createBox(atoms, usedProperties);

const App = () => {
  return (
    <div className={themeClass}>
      <Box as="a" href="https://google.com" padding={{ desktop: 'large', mobile: 'small' }}>Hello</Box>
    </div>
  );
}

const container = document.createElement('div');
document.body.appendChild(container);

// ReactDOM.render(
//   <App />,
//   container,
// );
