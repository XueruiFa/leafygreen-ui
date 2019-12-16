import React, { RefObject, useRef } from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import {
  menuItemContainerStyle,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
} from './utils';

const subMenuHeight = css`
  min-height: 56px;
`;

const linkStyle = css``;

const closedIconStyle = css`
  transform: rotate(180deg);
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  margin-top: 2px;
  color: ${uiColors.gray.base};
`;

const disabledStyle = css``;

const mainTextStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const activeMainTextStyle = css`
  font-weight: bolder;
  color: ${uiColors.green.dark3};
`;

const descriptionTextStyle = css`
  font-size: 12px;
  color: ${uiColors.blue.base};
`;

const activeDescriptionTextStyle = css`
  color: ${uiColors.green.dark2};
`;

const disbaledTextStyle = css``;

interface SharedSubMenuProps {
  open: boolean;
  setOpen: React.SetStateAction<boolean>;
  className?: string;
  description: string;
  disabled?: boolean;
  active?: boolean;
}

interface LinkSubMenuProps extends HTMLElementProps<'a'>, SharedSubMenuProps {
  href: string;
}

interface ButtonSubMenuProps
  extends HTMLElementProps<'button'>,
    SharedSubMenuProps {
  href?: null;
}

type SubMenuProps = LinkSubMenuProps | ButtonSubMenuProps;

function usesLinkElement(
  props: LinkSubMenuProps | ButtonSubMenuProps,
): props is LinkSubMenuProps {
  return props.href != null;
}

const SubMenu = React.forwardRef((props: SubMenuProps, ref) => {
  const {
    title,
    description,
    href,
    children,
    open,
    setOpen,
    onKeyDown,
    className,
    onClick,
    active = false,
    disabled = false,
    ...rest
  } = props;

  const iconButtonRef = useRef(null);

  const renderedSubMenuItem = (Root: React.ElementType<any> = 'button') => (
    <li role="none">
      <Root
        {...rest}
        onKeyDown={onKeyDown}
        role="menuitem"
        href={href}
        aria-haspopup="true"
        // aria-expanded="false"
        tabIndex={-1}
        ref={ref as RefObject<any>}
        onClick={() => {
          onClick;

          if (iconButtonRef?.current?.contains(e.target)) {
            e.preventDefault();
          }
        }}
        className={cx(
          menuItemContainerStyle,
          subMenuHeight,
          linkStyle,
          {
            [activeMenuItemContainerStyle]: active,
            [disabledMenuItemContainerStyle]: disabled,
          },
          className,
        )}
      >
        <div className={cx(mainTextStyle, { [activeMainTextStyle]: active })}>
          {title}
          <IconButton
            ref={iconButtonRef}
            ariaLabel="CaretDown"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Icon
              glyph="CaretUp"
              className={cx({
                [openIconStyle]: open,
                [closedIconStyle]: !open,
              })}
            />
          </IconButton>
        </div>
        {description && (
          <div
            className={cx(descriptionTextStyle, {
              [activeDescriptionTextStyle]: active,
              [disbaledTextStyle]: disabled,
            })}
          >
            {description}
          </div>
        )}
      </Root>

      {open && (
        <ul
          className={css`
            list-style: none;
          `}
        >
          {children}
        </ul>
      )}
    </li>
  );

  if (usesLinkElement(props)) {
    return renderedSubMenuItem('a');
  }

  return renderedSubMenuItem();
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
