import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { LogoMark } from '@leafygreen-ui/logo';
import {
  Menu,
  SubMenu,
  MenuItem,
  MenuSeparator,
  FocusableMenuItem,
} from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

const buttonDataProp = createDataProp('button-data-prop');
const iconRef = createDataProp('icon-ref');
const subMenuContainer = createDataProp('sub-menu-container');

const triggerWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
`;

const interactionRing = css`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border-radius: 50px;
  transform: scale(0.9, 0.8);
  transition: transform 150ms ease-in-out;
  background-color: ${uiColors.gray.light2};

  ${buttonDataProp.selector}:hover ~ & {
    transform: scale(1);
  }

  ${buttonDataProp.selector}:active ~ & {
    transform: scale(1);
  }

  ${buttonDataProp.selector}:focus ~ & {
    background-color: #63b0d0;
    transform: scale(1);
  }
`;

const baseButtonStyles = css`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  position: relative;
  height: 30px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid ${uiColors.gray.light2};
  background-color: ${uiColors.white};
  border-radius: 14.5px;
  transition: background 150ms ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${uiColors.gray.dark2};
  font-size: 12px;
  cursor: pointer;
  z-index: 1;

  &:active {
    color: ${uiColors.gray.dark2};

    ${iconRef.selector} {
      color: ${uiColors.gray.dark1};
    }
  }

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const openBaseButtonStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
  font-weight: bold;
`;

const menuNameStyle = css`
  margin-right: 24px;
  margin-left: 2px;
  max-width: 162px;
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const closedIconStyle = css`
  transform: rotate(180deg);
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  margin-top: 2px;
  color: ${uiColors.gray.dark2};
`;

const menuStyle = css`
  width: 300px;
`;

const headerStyle = css`
  padding: 24px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${uiColors.gray.dark3};
  color: ${uiColors.white};
  max-width: 100%;
`;

const logoMarkBackground = css`
  background-color: white;
  width: 43px;
  height: 43px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin: 0px;
  max-width: 100%;
`;

const subMenuContainerStyle = css`
  pointer-events: inherit;
`;

const subMenuActiveContainerStyle = css`
  pointer-events: none;
`;

const productLinkStyle = css`
  font-size: 12px;
  color: ${uiColors.blue.base};
  display: flex;
  align-items: flex-end;

  ${subMenuContainer.selector}:hover & {
    color: ${uiColors.blue.dark2};
  }
`;

const activeProductLinkStyle = css`
  color: ${uiColors.gray.light1};
`;

const productLinkIconStyle = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;

  ${subMenuContainer.selector}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0px);
  }
`;

const descriptionStyle = css`
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  margin-top: 0px;
  margin-bottom: 16px;
  max-width: 100%;
`;

const logoutContainer = css`
  height: 56px;
  background-color: ${uiColors.gray.light3};
`;

interface SubMenuInterface {
  displayName: 'Atlas' | 'University' | 'Cloud Support';
  href:
    | 'https://cloud.mongodb.com'
    | 'https://university.mongodb.com'
    | 'https://support.mongodb.com';
  description: string;
  slug: Product;
  subMenu: Array<string>;
  glyph: Glyph;
}

const subMenus: Array<SubMenuInterface> = [
  {
    displayName: 'Atlas',
    description: 'cloud.mongodb.com',
    href: 'https://cloud.mongodb.com',
    slug: 'atlas',
    subMenu: [
      'User Preferences',
      'Invitations',
      'Organizations',
      'Two-Factor Authorization',
    ],
    glyph: 'Cloud',
  },
  {
    displayName: 'University',
    description: 'university.mongodb.com',
    href: 'https://university.mongodb.com',
    slug: 'university',
    subMenu: ['Video Preferences'],
    glyph: 'Laptop',
  },
  {
    displayName: 'Cloud Support',
    description: 'support.mongodb.com',
    href: 'https://support.mongodb.com',
    slug: 'support',
    subMenu: ['User Preferences'],
    glyph: 'Support',
  },
];

const Product = {
  Atlas: 'atlas',
  University: 'university',
  Support: 'support',
} as const;

type Product = typeof Product[keyof typeof Product] | '';

export { Product };

type Glyph = keyof typeof glyphs;

interface MongoMenuProps {
  /**
   * Object that contains information about the active user. {name: 'string', email: 'string'}
   */
  user: { name: string; email: string };

  /**
   * MongoDB product that is currently active: ['atlas', 'university', 'support'].
   */
  activeProduct?: Product;

  /**
   * Callback invoked after the user clicks log out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked after the user clicks a product.
   */
  onProductChange?: React.MouseEventHandler;

  /**
   * URL passed to MongoDB Account button. If explicitly set to the
   * empty string, the button will be disabled and not render as a
   * link (e.g. for users already in the account app).
   */
  accountURL?: string;
}

/**
 * # MongoMenu
 *
 * ```
<MongoMenu
    user={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeProduct="atlas"
    onLogout={() => console.log('On logout')}
    onProductChange={() => console.log('Switching products')}
    accountURL="https://cloud.mongodb.com/account/profile"
  />
 * ```
 * @param props.user Object that contains information about the active user. {name: 'string', email: 'string'}
 * @param props.activeProduct  MongoDB product that is currently active: ['atlas', 'university', 'support'].
 * @param props.onLogout Callback invoked after the user clicks log out.
 * @param props.onProductChange Callback invoked after the user clicks a product.
 * @param props.accountURL URL (relative or absolute) linked to by the MongoDB Account button
 */
function MongoMenu({
  user: { name, email },
  accountURL = 'https://cloud.mongodb.com/v2#/account',
  activeProduct = '',
  onLogout = () => {},
  onProductChange = () => {},
}: MongoMenuProps) {
  const [open, setOpen] = useState(false);

  const renderSubMenu = ({
    slug,
    href,
    displayName,
    glyph,
    subMenu,
    description,
  }: SubMenuInterface) => {
    const isActive = slug === activeProduct;

    const subMenuDescription = (
      <div
        className={cx(productLinkStyle, {
          [activeProductLinkStyle]: isActive,
        })}
      >
        {description}
        <Icon
          size="small"
          glyph="CaretRight"
          className={productLinkIconStyle}
        />
      </div>
    );

    return (
      <SubMenu
        {...subMenuContainer.prop}
        key={displayName}
        active={isActive}
        href={href}
        description={subMenuDescription}
        target="_blank"
        rel="noopener noreferrer"
        title={displayName}
        glyph={glyph}
        onClick={e => {
          onProductChange(e);
          setOpen(false);
        }}
        className={cx(subMenuContainerStyle, {
          [subMenuActiveContainerStyle]: isActive,
        })}
      >
        {subMenu.map(sub => (
          <MenuItem key={sub}>{sub}</MenuItem>
        ))}
      </SubMenu>
    );
  };

  return (
    <div className={triggerWrapper}>
      <button
        {...buttonDataProp.prop}
        className={cx(baseButtonStyles, { [openBaseButtonStyle]: open })}
        onClick={() => setOpen(curr => !curr)}
      >
        <span className={cx(menuNameStyle, truncate)}>
          {name.split(' ')[0]}
        </span>

        <Icon
          {...iconRef.prop}
          glyph="CaretUp"
          className={cx({
            [openIconStyle]: open,
            [closedIconStyle]: !open,
          })}
        />
      </button>
      <div className={interactionRing} />

      <Menu open={open} setOpen={setOpen} className={menuStyle}>
        <div className={headerStyle}>
          <div className={logoMarkBackground}>
            <LogoMark height={30} />
          </div>

          <h3 className={cx(nameStyle, truncate)}>{name}</h3>

          <p className={cx(descriptionStyle, truncate)}>{email}</p>

          <FocusableMenuItem>
            <Button href={accountURL} disabled={!accountURL}>
              Manage your MongoDB Account
            </Button>
          </FocusableMenuItem>
        </div>

        <MenuSeparator />

        {subMenus.map(renderSubMenu)}

        <MenuSeparator />

        <MenuItem onClick={onLogout} className={logoutContainer}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

MongoMenu.displayName = 'MongoMenu';

const slugs = subMenus.map(mi => mi.slug);

MongoMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf(slugs),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default MongoMenu;
