# Menu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/menu.svg)

## Example

```js
import { Menu, MenuSeparator, MenuItem } from '@leafygreen-ui/menu';

<Menu align="bottom" justify="start" trigger={<button>trigger</button>}>
  <MenuItem active>Active Menu Item</MenuItem>
  <MenuItem
    disabled={boolean('Disabled', true)}
    description="I am a description"
  >
    Disabled Menu Item
  </MenuItem>
  <MenuItem description="I am also a description">
    Menu Item With Description
  </MenuItem>
  <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
</Menu>;
```

**Output HTML**

```html
<button>
  trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-19z0mfw">
  <ul class="leafygreen-ui-1guv7w9" role="menu">
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-19xfwtd"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-14a8fex">Active Menu Item</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-7pgwa0"
        role="menuitem"
        aria-disabled="true"
        tabindex="-1"
      >
        <div class="leafygreen-ui-10xqyru">Disabled Menu Item</div>
        <div class="leafygreen-ui-17sf9go">I am a description</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item With Description</div>
        <div class="leafygreen-ui-1dm36mc">I am also a description</div>
      </button>
    </li>
    <li role="none">
      <a
        data-leafygreen-ui="menu-item-container"
        target="_blank"
        rel="noopener noreferrer"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
        href="http://mongodb.design"
        ><div class="leafygreen-ui-r0sqyc">I am a link!</div></a
      >
    </li>
  </ul>
</div>
```

## Properties

| Prop               | Type                                     | Description                                                                                                                                                                                                                                                             | Default      |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open`             | `boolean`                                | Determines whether or not the `<Menu />` will appear as open or closed                                                                                                                                                                                                  | `false`      |
| `setOpen`          | `function`                               | When controlling the component, use `setOpen` to keep track of the `<Menu />` component's state so that clicks on the document's backdrop as well as a user pressing the Escape Key will close the Menu and update the consuming application's local state accordingly. |
| `shouldClose`      | `function`                               | Determines if the `Menu` should close when the backdrop or Escape keys are clicked. Defaults to true.                                                                                                                                                                   | `() => true` |
| `align`            | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the alignment of the `<Menu />` component relative to a reference element, or the element's nearest parent                                                                                                                                                   | `'bottom'`   |
| `justify`          | `'start'`, `'middle'`, `'end'`           | Determines the justification of the `Menu` component (based on the alignment) relative to a reference element or the element's nearest parent                                                                                                                           | `'end'`      |
| `refEl`            | `node`                                   | Pass a reference to an element that the `Menu` component should be positioned against                                                                                                                                                                                   |              |
| `trigger`          | `HTMLElement` or `ReactNode`             | An `HTMLElement` or `ReactNode` against which the Menu will be positioned.                                                                                                                                                                                              |              |
| `usePortal`        | `boolean`                                | Will position Menu's children relative to its parent without using a Portal if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.                                                          | `true`       |
| `adjustOnMutation` | `boolean`                                | Determines whether or not the `<Menu/>` should reposition itself based on changes to `trigger` or `referenceElement` position.                                                                                                                                          | `false`      |

_Any other properties will be spread on the Menu `div` container_

# MenuSeparator

## Properties

Self-closing component that provides a way to group `MenuItems` in a `Menu` component.

# MenuItem

## Properties

| Prop          | Type       | Description                                                                                    | Default |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------- | ------- |
| `href`        | `string`   | If supplied, will render the `<MenuItem />` inside of an `<a>` tag, rather than a `<span>` tag |         |
| `children`    | `node`     | Content to appear inside of `<MenuItem />` component                                           |         |
| `className`   | `string`   | Classname applied to `li` element                                                              |         |
| `onClick`     | `function` | Function that will be called when a `<MenuItem />` is clicked                                  |         |
| `active`      | `boolean`  | Determines if the `<MenuItem />` is `active`                                                   | `false` |
| `disabled`    | `boolean`  | Determines if the `<MenuItem />` is `disabled`                                                 | `false` |
| `description` | `string`   | Description text that will appear below the main content of `<MenuItem />`                     |         |

_Any other properties will be spread on the MenuItem `div` container_

## Advanced Use Case

## Example

```js
import { Menu, MenuSeparator, MenuItem } from '@leafygreen-ui/menu';

<Menu
  align="bottom"
  justify="start"
  trigger={({ onClick, children }) => (
    <button onClick={onClick}>
      Example Trigger
      {children}
    </button>
  )}
>
  <MenuItem>Menu Item 1</MenuItem>
  <MenuItem>Menu Item 2</MenuItem>
  <MenuItem>Menu Item 3</MenuItem>
</Menu>;
```

## Output HTML

```html
<button>
  Example Trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-1td4qre">
  <ul class="leafygreen-ui-1guv7w9" role="menu">
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 1</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 2</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 3</div>
      </button>
    </li>
  </ul>
</div>
```

| Prop      | Type                      | Description                                                                                                                                                                                            | Default |
| --------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `trigger` | `function` or `ReactNode` | The trigger prop can also support being passed a function. To work as expected, the function must accept an argument of `children`, which should be rendered inside of the function passed to trigger. |         |
