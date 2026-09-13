import type { FormEvent } from 'react';

import { Button, Flex, Image, Input } from 'antd';

import { FiMenu, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

import { useNavigate } from 'react-router';

import perryLogo from '../../assets/logo/perry-logo.svg';

import './Header.css';

interface HeaderProps {
  onProfileClick?: () => void;
}

export const Header = ({
  onProfileClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = formData
      .get('search')
      ?.toString()
      .trim();

    if (!searchValue) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(searchValue)}`,
    );
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
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

          <button
            className="header__logo-link"
            type="button"
            onClick={handleLogoClick}
            aria-label="Go to Perry home page"
          >
            <Image
              className="header__logo-image"
              src={perryLogo}
              alt="Perry"
              preview={false}
            />
          </button>
        </Flex>

        <form
          className="header__search"
          onSubmit={handleSearchSubmit}
        >
          <Input
            className="header__search-input"
            name="search"
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
            aria-label="Open login form"
            onClick={onProfileClick}
          />

          <Button
            className="header__action-button"
            type="text"
            icon={<FiShoppingCart />}
            aria-label="Open cart"
            onClick={handleCartClick}
          />
        </Flex>
      </Flex>
    </header>
  );
};