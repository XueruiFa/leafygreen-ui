import React, { RefObject, useRef } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import {
  menuItemContainerStyle,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
  linkStyle,
  disabledTextStyle,
} from './styles';

const subMenuContainer = createDataProp('sub-menu-container');

const liStyle = css`
  position: relative;
  overflow: hidden;
`;

const subMenuStyle = css`
  flex-direction: row;
  min-height: 56px;
  border-bottom: 1px solid ${uiColors.gray.light2};
  background-color: ${uiColors.gray.light3};
  align-items: center;
  justify-content: flex-start;
`;

const subMenuOpenStyle = css`
  background-color: ${uiColors.white};

  &:hover {
    background-color: ${uiColors.gray.light2};
  }
`;

const closedIconStyle = css`
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  color: ${uiColors.gray.dark2};
`;

const mainTextStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color: ${uiColors.gray.dark3};

  ${subMenuContainer.selector}:focus & {
    color: ${uiColors.blue.dark3};
  }
`;

const activeMainTextStyle = css`
  font-weight: bolder;
  color: ${uiColors.green.dark3};
`;

const iconButtonStyle = css`
  position: absolute;
  z-index: 1;
  right: 8px;
  top: ${52 / 2 - 22 / 2}px;
  margin: auto;
  background-color: ${uiColors.gray.light3};
  transition: background-color 150ms ease-in-out;

  ${subMenuContainer.selector}:focus + & {
    background-color: ${uiColors.blue.light3};
    transition: background-color 150ms ease-in-out;
  }

  ${subMenuContainer.selector}:hover + & {
    background-color: ${uiColors.gray.light2};
    transition: background-color 150ms ease-in-out;
  }
`;

const openIconButtonStyle = css`
  background-color: ${uiColors.white};
  transition: background-color 150ms ease-in-out;
`;

const mainIconStyle = css`
  color: ${uiColors.gray.base};
  // 15px of padding from MenuItem + 32px width of SVG + 13px = 60px
  // which is the padding-left for children of SubMenus.
  margin-right: 13px;
  flex-shrink: 0;

  ${subMenuContainer.selector}:focus > & {
    color: ${uiColors.blue.base};
  }

  ${subMenuContainer.selector}:hover > & {
    color: ${uiColors.gray.dark1};
  }
`;

const activeIconStyle = css`
  color: ${uiColors.green.base};

  ${subMenuContainer.selector}:hover > & {
    color: ${uiColors.green.base};
  }
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: height 150ms ease-in-out;
`;

const menuItemStyles = css`
  padding-left: 60px;
`;

const menuItemBorder = css`
  position: absolute;
  width: 100%;
  height: 1px;
  background: ${uiColors.gray.light2};
  bottom: 0;
`;

type Glyph = keyof typeof glyphs;

interface SharedSubMenuProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  description: string | React.ReactElement;
  disabled?: boolean;
  active?: boolean;
  glyph?: Glyph;
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

const subMenuItemHeight = 36;

const SubMenu = React.forwardRef((props: SubMenuProps, ref) => {
  const {
    title,
    description,
    href,
    children,
    setOpen,
    onKeyDown,
    className,
    onClick,
    glyph,
    open = false,
    active = false,
    disabled = false,
    ...rest
  } = props;

  const iconButtonRef: React.MutableRefObject<HTMLElement | null> = useRef(
    null,
  );

  const onRootClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
      React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (iconButtonRef?.current?.contains(e.target as HTMLElement)) {
      e.preventDefault();
    } else if (onClick) {
      onClick(e);
    }
  };

  const renderedSubMenuItem = (Root: React.ElementType<any> = 'button') => (
    <li role="none" className={liStyle}>
      <Root
        {...subMenuContainer.prop}
        {...rest}
        onKeyDown={onKeyDown}
        role="menuitem"
        href={href}
        aria-haspopup="true"
        ref={ref as RefObject<any>}
        onClick={onRootClick}
        className={cx(
          menuItemContainerStyle,
          subMenuStyle,
          linkStyle,
          {
            [activeMenuItemContainerStyle]: active,
            [disabledMenuItemContainerStyle]: disabled,
            [subMenuOpenStyle]: open,
          },
          className,
        )}
      >
        {glyph && (
          <Icon
            glyph={glyph}
            size="xlarge"
            className={cx(mainIconStyle, {
              [activeIconStyle]: active,
            })}
          />
        )}

        <div>
          <div
            className={cx(mainTextStyle, {
              [activeMainTextStyle]: active,
            })}
          >
            {title}
          </div>

          <div className={cx({ [disabledTextStyle]: disabled })}>
            {description}
          </div>
        </div>
      </Root>

      <IconButton
        ref={iconButtonRef}
        ariaLabel={open ? 'Caret Up' : 'Caret Down'}
        className={cx(iconButtonStyle, { [openIconButtonStyle]: open })}
        onClick={(e: React.MouseEvent) => {
          e.nativeEvent.stopImmediatePropagation();

          if (setOpen) {
            setOpen(!open);
          }
        }}
      >
        <Icon
          glyph={open ? 'CaretUp' : 'CaretDown'}
          className={open ? openIconStyle : closedIconStyle}
        />
      </IconButton>

      <Transition
        in={open}
        timeout={{
          enter: 0,
          exit: 150,
        }}
        mountOnEnter
        unmountOnExit
      >
        {(state: string) => (
          <ul
            className={cx(ulStyle, {
              [css`
                height: ${subMenuItemHeight *
                  React.Children.toArray(children).length}px;
              `]: state === 'entered',
            })}
            role="menu"
            aria-label={title}
          >
            {React.Children.map(children as React.ReactElement, child => {
              return React.cloneElement(child, {
                children: (
                  <>
                    {child.props.children}
                    <div className={menuItemBorder}></div>
                  </>
                ),
                className: cx(menuItemStyles, child.props.className),
                onClick: (
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                    React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => {
                  child.props?.onClick?.(e);
                  if (onClick) {
                    onClick(e);
                  }
                },
              });
            })}
          </ul>
        )}
      </Transition>
    </li>
  );

  if (usesLinkElement(props)) {
    return renderedSubMenuItem('a');
  }

  return renderedSubMenuItem();
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
