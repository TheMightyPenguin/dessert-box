import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer';
import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { styledRuntime } from './styledRuntime';
import { ValidComponent } from 'solid-js';

export function styled(el: ValidComponent, rules: ComplexStyleRule) {
  let className = style(rules);
  let args = [el, className] as const;

  let Component = styledRuntime(el, className);

  addFunctionSerializer(Component, {
    importPath: '@dessert-box/solid/styledRuntime',
    importName: 'styledRuntime',
    // TODO: Fix this type, was complaining about string not being assignable to Serializable from VE lib
    args: args as any,
  });

  return Component;
}
