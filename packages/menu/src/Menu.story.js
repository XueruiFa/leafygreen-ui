import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { Menu, MenuSeparator, MenuItem } from '.';
import SubMenu from './SubMenu';
import { Align, Justify } from '@leafygreen-ui/popover';

function Uncontrolled() {
  return (
    <Menu
      align={select('Align', Object.values(Align), Align.Bottom)}
      justify={select('Justify', Object.values(Justify), Justify.Start)}
      trigger={<button>trigger</button>}
    >
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
    </Menu>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)}>
      trigger
      <Menu
        align={select('Align', Object.values(Align), Align.Bottom)}
        justify={select('Justify', Object.values(Justify), Justify.Start)}
        open={open}
        setOpen={setOpen}
      >
        <MenuItem active>Active Menu Item</MenuItem>
        <MenuItem disabled={boolean('Disabled', true)}>
          Disabled Menu Item
        </MenuItem>
        <MenuItem description="I am a description">
          Menu Item With Description
        </MenuItem>
        <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
        <MenuSeparator />
        <MenuItem>Left out of the MenuGroup</MenuItem>
      </Menu>
    </button>
  );
}

function Test() {
  return (
    <Menu trigger={<button>trigger</button>}>
      <MenuItem>test 1</MenuItem>
      <SubMenu
        title="Cloud"
        description="https://google.com"
        glpyh="Cloud"
        active={true}
      >
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
      </SubMenu>
      <SubMenu title="Support" description="https://google.com" glpyh="Support">
        <MenuItem>Test 1</MenuItem>
      </SubMenu>
      <SubMenu title="Education" description="https://google.com">
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
        <MenuItem>Test 3</MenuItem>
      </SubMenu>
    </Menu>
  );
}

storiesOf('Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />)
  .add('Test', () => <Test />);
