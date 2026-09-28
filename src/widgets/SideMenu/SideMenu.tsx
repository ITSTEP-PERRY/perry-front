import {
  Button,
  Drawer,
} from 'antd';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  categoriesApi,
} from '../../api';

import type {
  CategoryDto,
} from '../../api/types';

import {
  useAuth,
} from '../../app/AuthContext';

import closeIcon from '../../assets/icons/side-menu/menu-close.svg';
import guestAvatarIcon from '../../assets/icons/side-menu/guest-avatar.svg';
import catalogIcon from '../../assets/icons/side-menu/catalog.svg';
import fashionIcon from '../../assets/icons/side-menu/fashion.svg';
import electronicsIcon from '../../assets/icons/side-menu/electronics.svg';
import householdIcon from '../../assets/icons/side-menu/household.svg';
import furnitureIcon from '../../assets/icons/side-menu/furniture.svg';
import workToolsIcon from '../../assets/icons/side-menu/work-tools.svg';
import helpIcon from '../../assets/icons/side-menu/help.svg';
import arrowUpIcon from '../../assets/icons/side-menu/arrow-up.svg';

import './SideMenu.css';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

interface MenuCategory {
  key: string;
  title: string;
  icon: string;
  category?: CategoryDto;
}

const normalize = (
  value: string,
) =>
  value
    .trim()
    .toLowerCase();

const findCategory = (
  nodes: CategoryDto[],
  names: string[],
): CategoryDto | undefined => {
  for (const category of nodes) {
    const categoryName =
      normalize(
        category.name,
      );

    const matches =
      names.some((name) =>
        categoryName.includes(
          normalize(name),
        ),
      );

    if (matches) {
      return category;
    }

    if (
      category.subCategories
        ?.length
    ) {
      const nested =
        findCategory(
          category.subCategories,
          names,
        );

      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
};

export const SideMenu = ({
  open,
  onClose,
}: SideMenuProps) => {
  const navigate =
    useNavigate();

  const { user } = useAuth();

  const [
    catalogOpen,
    setCatalogOpen,
  ] = useState(true);

  const [
    categories,
    setCategories,
  ] = useState<
    CategoryDto[]
  >([]);

  useEffect(() => {
    if (!open) {
      return;
    }

    categoriesApi
      .tree()
      .then(setCategories)
      .catch(() =>
        setCategories([]),
      );
  }, [open]);

  const menuCategories =
    useMemo<
      MenuCategory[]
    >(
      () => [
        {
          key: 'fashion',
          title: 'Fashion',
          icon: fashionIcon,

          category:
            findCategory(
              categories,
              [
                'fashion',
                'clothing',
              ],
            ),
        },

        {
          key:
            'electronics',

          title:
            'Electronics',

          icon:
            electronicsIcon,

          category:
            findCategory(
              categories,
              [
                'electronics',
              ],
            ),
        },

        {
          key:
            'household',

          title:
            'Household',

          icon:
            householdIcon,

          category:
            findCategory(
              categories,
              [
                'household',
                'home',
              ],
            ),
        },

        {
          key:
            'furniture',

          title:
            'Furniture',

          icon:
            furnitureIcon,

          category:
            findCategory(
              categories,
              [
                'furniture',
              ],
            ),
        },

        {
          key:
            'work-tools',

          title:
            'Work tools',

          icon:
            workToolsIcon,

          category:
            findCategory(
              categories,
              [
                'work tools',
                'tools',
              ],
            ),
        },
      ],
      [categories],
    );

  const handleNavigate = (
    path: string,
  ) => {
    navigate(path);

    onClose();
  };

  const handleCategoryClick = (
    item: MenuCategory,
  ) => {
    if (
      item.category?.id
    ) {
      handleNavigate(
        `/products?categoryId=${item.category.id}`,
      );

      return;
    }

    handleNavigate(
      '/products',
    );
  };

  return (
    <>
      <Drawer
        open={open}
        placement="left"
        width={365}
        closable={false}
        onClose={onClose}
        className="side-menu"
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="side-menu__content">
          <div className="side-menu__inner">

            {/* =========================
                USER / GUEST
            ========================= */}

            {!user ? (
              <div className="side-menu__guest">

                <img
                  src={
                    guestAvatarIcon
                  }
                  alt=""
                  className="side-menu__guest-avatar"
                />

                <div className="side-menu__guest-info">

                  <div className="side-menu__guest-title">
                    Not signed in
                  </div>

                  <div className="side-menu__guest-text">
                    Log in to enjoy a
                    more pleasant
                    experience
                  </div>

                </div>

                <Button
                  type="primary"
                  className="side-menu__signup"
                  onClick={() =>
                    handleNavigate(
                      '/register',
                    )
                  }
                >
                  Sign up
                </Button>

                <Button
                  className="side-menu__login"
                  onClick={() =>
                    handleNavigate(
                      '/login',
                    )
                  }
                >
                  Log in
                </Button>

              </div>
            ) : (
              <div className="side-menu__user">

                <img
                  src={
                    guestAvatarIcon
                  }
                  alt=""
                  className="side-menu__guest-avatar"
                />

                <div className="side-menu__user-name">
                  {user.name}
                </div>

                <div className="side-menu__user-role">
                  Customer
                </div>

              </div>
            )}

            {/* DIVIDER */}

            <div className="side-menu__divider" />

            {/* =========================
                PRODUCT CATALOG
            ========================= */}

            <div className="side-menu__catalog">

              <button
                type="button"
                className="side-menu__catalog-header"
                onClick={() =>
                  setCatalogOpen(
                    (previous) =>
                      !previous,
                  )
                }
              >
                <span className="side-menu__catalog-left">

                  <img
                    src={
                      catalogIcon
                    }
                    alt=""
                    className="side-menu__catalog-icon"
                  />

                  <span>
                    Product catalog
                  </span>

                </span>

                <img
                  src={
                    arrowUpIcon
                  }
                  alt=""
                  className={
                    catalogOpen
                      ? 'side-menu__catalog-arrow'
                      : 'side-menu__catalog-arrow side-menu__catalog-arrow--closed'
                  }
                />
              </button>

              {catalogOpen && (
                <div className="side-menu__category-list">

                  {menuCategories.map(
                    (item) => (
                      <button
                        type="button"
                        key={
                          item.key
                        }
                        className="side-menu__category"
                        onClick={() =>
                          handleCategoryClick(
                            item,
                          )
                        }
                      >
                        <img
                          src={
                            item.icon
                          }
                          alt=""
                          className="side-menu__category-icon"
                        />

                        <span>
                          {
                            item.title
                          }
                        </span>
                      </button>
                    ),
                  )}

                </div>
              )}

              <Button
                className="side-menu__see-all"
                onClick={() =>
                  handleNavigate(
                    '/products',
                  )
                }
              >
                See all
              </Button>

            </div>

            {/* DIVIDER */}

            <div className="side-menu__divider" />

            {/* =========================
                BOTTOM
            ========================= */}

            <div className="side-menu__bottom">

              <button
                type="button"
                className="side-menu__action"
              >
                <img
                  src={
                    helpIcon
                  }
                  alt=""
                />

                <span>
                  Help & FAQ
                </span>
              </button>

            </div>

          </div>
        </div>
      </Drawer>

      {/* =========================
          CLOSE BUTTON
      ========================= */}

      {open && (
        <Button
          type="text"
          className="side-menu__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <img
            src={closeIcon}
            alt=""
            className="side-menu__close-icon"
          />
        </Button>
      )}
    </>
  );
};