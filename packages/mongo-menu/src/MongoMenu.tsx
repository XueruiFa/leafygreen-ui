import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
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

const iconRef = createDataProp('icon-ref');

const buttonReset = css`
  appearance: none;
  background: none;
  border: 0px;
  position: relative;
  padding: 0px;

  &:hover:before {
    transform: scale(1);
  }

  &:active {
    outline: none;
    color: ${uiColors.gray.dark2};

    &:before {
      transform: scale(1);
    }

    & ${iconRef.selector} {
      color: ${uiColors.gray.dark1};
    }
  }

  &:focus {
    outline: none;

    &:before {
      background-color: #63b0d0;
      transform: scale(1);
    }
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    border-radius: 50px;
    transform: scale(0.9, 0.8);
    transition: transform 150ms ease-in-out;
    background-color: ${uiColors.gray.light2};
  }
`;

const menuButtonStyle = css`
  height: 29px;
  padding-left: 14px;
  padding-right: 14px;
  border: 1px solid ${uiColors.gray.light1};
  background-color: ${uiColors.white};
  border-radius: 14.5px;
  cursor: pointer;
  transition: background 150ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${uiColors.gray.dark2};
  font-size: 12px;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const menuNameStyle = css`
  margin-right: 2px;
  margin-left: 2px;
  max-width: 162px;
`;

const activeMenuButtonStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
  font-weight: bolder;
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

const menuContainer = css`
  width: 300px;
`;

const headerStyle = css`
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${uiColors.gray.dark3};
  color: ${uiColors.white};
  max-width: 100%;
`;

const logoMarkStyle = css`
  background-color: white;
  width: 43px;
  height: 43px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin: 0px;
`;

const descriptionStyle = css`
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  margin-top: 0px;
  margin-bottom: 15px;
  max-width: 100%;
`;

const logoutContainer = css`
  height: 56px;
  background-color: ${uiColors.gray.light3};
`;

const menuItems = [
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
  return (
    <button className={buttonReset} onClick={() => setOpen(curr => !curr)}>
      <div
        className={cx(menuButtonStyle, {
          [activeMenuButtonStyle]: open,
        })}
      >
        <span className={cx(menuNameStyle, truncate)}>{name}</span>

        <Icon
          {...iconRef.prop}
          glyph="CaretUp"
          className={cx({
            [openIconStyle]: open,
            [closedIconStyle]: !open,
          })}
        />
      </div>

      <Menu open={open} setOpen={setOpen} className={menuContainer}>
        <div className={headerStyle}>
          <span className={logoMarkStyle}>
            <LogoMark height={30} />
          </span>
          <h3 className={cx(nameStyle, truncate)}>{name}</h3>
          <p className={cx(descriptionStyle, truncate)}>{email}</p>
          <FocusableMenuItem>
            <Button
              href={accountURL || undefined}
              as={accountURL ? 'a' : 'button'}
              disabled={!accountURL}
            >
              Manage your MongoDB Account
            </Button>
          </FocusableMenuItem>
        </div>
        <MenuSeparator />
        {menuItems.map(el => {
          return (
            <SubMenu
              onClick={e => {
                onProductChange(e);
                setOpen(false);
              }}
              key={el.displayName}
              active={el.slug === activeProduct}
              href={el.href}
              description={el.description}
              target="_blank"
              rel="noopener noreferrer"
              title={el.displayName}
              glyph={el.glyph}
            >
              {el.subMenu.map(sub => (
                <MenuItem key={sub}>{sub}</MenuItem>
              ))}
            </SubMenu>
          );
        })}
        <MenuSeparator />
        <MenuItem onClick={onLogout} className={logoutContainer}>
          Logout
        </MenuItem>
      </Menu>
    </button>
  );
}

MongoMenu.displayName = 'MongoMenu';

const slugs = menuItems.map(mi => mi.slug);

MongoMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf(slugs),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default MongoMenu;
