import { createElement } from 'react';

export function styledRuntime<T extends keyof JSX.IntrinsicElements>(
  el: T,
  className: string,
) {
  const Component = function Component(props: React.ComponentProps<T>) {
    return createElement(el, {
      ...props,
      className: [props.className, className].filter(Boolean).join(' '),
    });
  };

  Component.displayName = `DBStyled(${el})`;

  return Component;
}
