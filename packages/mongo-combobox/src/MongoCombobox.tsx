import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Popover from '@leafygreen-ui/popover';
import { uiColors } from '@leafygreen-ui/palette';

import MongoComboboxTextbox from './MongoComboboxTextbox';
import MongoComboboxListbox from './MongoComboboxListbox';

const containerStyle = css`
  background-color: ${uiColors.white};
  border: 1px solid #dee0e3;
  box-shadow: 0px 2px 6px 0px #dee0e3;
  padding: 15px;
  width: 282px;
`;

interface MongoComboboxProps {
  children?: React.ReactNode;
  selected: string;
  title: string;
  data: Array<{ name: string; product: string }>;
  placeholder: string;
  onSelect?: React.MouseEventHandler;
}

export default function MongoCombobox({
  selected,
  title,
  data,
  placeholder,
  onSelect,
}: MongoComboboxProps) {
  const [active, setActive] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange = (e: React.ChangeEvent) => {
    setFilteredData(
      data.filter(datum => {
        return datum.name
          .toLowerCase()
          .includes((e.target as HTMLInputElement).value.toLowerCase());
      }),
    );
  };

  return (
    <button
      onClick={() => setActive(curr => !curr)}
      id="combobox-trigger"
      className={css`
        position: relative;
      `}
    >
      {selected}
      <Popover active={active} usePortal={false}>
        {/* container div that prevents popover from closing when content inside is clicked */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div onClick={e => e.stopPropagation()} className={containerStyle}>
          <MongoComboboxTextbox
            title={title}
            placeholder={placeholder}
            onChange={onChange}
          />
          <MongoComboboxListbox
            data={filteredData}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </Popover>
    </button>
  );
}