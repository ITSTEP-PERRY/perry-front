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

import { useNavigate } from 'react-router-dom';

import perryLogo from '../../assets/logo/perry-logo.svg';

import './Header.css';

interface HeaderProps {
  onMenuClick?: () => void;
  onProfileClick?: () => void;
}

export const Header = ({
  onMenuClick,
  onProfileClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    const searchValue = formData
      .get('search')
      ?.toString()
      .trim();

    if (!searchValue) {
      navigate('/products');
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        searchValue,
      )}`,
    );
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
      return;
    }

    navigate('/login');
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
            onClick={onMenuClick}
          />

          <button
            type="button"
            className="header__logo-link"
            aria-label="Perry home"
            onClick={() =>
              navigate('/')
            }
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
          onSubmit={
            handleSearchSubmit
          }
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
            aria-label="Open profile"
            onClick={
              handleProfileClick
            }
          />

          <Button
            className="header__action-button"
            type="text"
            icon={
              <FiShoppingCart />
            }
            aria-label="Open cart"
            onClick={() =>
              navigate('/cart')
            }
          />
        </Flex>
      </Flex>
    </header>
  );
};