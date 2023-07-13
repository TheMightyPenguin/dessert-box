import { ParentComponent, splitProps, ValidComponent, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export function styledRuntime(el: ValidComponent, className: string) {
  let Component: ParentComponent<{
    class?: string;
    style?: JSX.CSSProperties;
  }> = (props) => {
    let [local, others] = splitProps(props, ['class']);

    return (
      <Dynamic
        component={el}
        class={[local.class, className].filter(Boolean).join(' ')}
        {...others}
      />
    );
  };
  return Component;
}
