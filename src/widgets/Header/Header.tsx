import type { FormEvent } from 'react';

import {
  Button,
  Flex,
  Image,
  Input,
} from 'antd';

import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';

import perryLogo from '../../assets/logo/perry-logo.svg';

import './Header.css';

export const Header = () => {
  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <Flex
        className="header__inner"
        align="center"
        gap={32}
      >
        <Flex
          className="header__brand"
          align="center"
          gap={12}
        >
          <Button
            className="header__menu-button"
            type="text"
            icon={<FiMenu />}
            aria-label="Open menu"
          />

          <a
            className="header__logo-link"
            href="/"
            aria-label="Perry home"
          >
            <Image
              className="header__logo-image"
              src={perryLogo}
              alt="Perry"
              preview={false}
            />
          </a>
        </Flex>

        <form
          className="header__search"
          onSubmit={handleSearchSubmit}
        >
          <Input
            className="header__search-input"
            placeholder="Search..."
            aria-label="Search products"
          />

          <Button
            className="header__search-button"
            htmlType="submit"
            icon={<FiSearch />}
            aria-label="Search"
          />
        </form>

        <Flex
          className="header__actions"
          align="center"
          gap={8}
        >
          <Button
            className="header__action-button"
            type="text"
            icon={<FiUser />}
            aria-label="Profile"
          />

          <Button
            className="header__action-button"
            type="text"
            icon={<FiShoppingCart />}
            aria-label="Cart"
          />
        </Flex>
      </Flex>
    </header>
  );
};