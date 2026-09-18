import { useEffect, useState } from 'react';

import {
  Breadcrumb,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Input,
  Pagination,
  Rate,
  Select,
  Slider,
  Typography,
} from 'antd';

import {
  FiGrid,
  FiHome,
  FiList,
  FiSearch,
} from 'react-icons/fi';

import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { ScrollToTop } from '../../Components/ScrollToTop/ScrollToTop';

import { Footer } from '../../widgets/Footer/Footer';
import { Header } from '../../widgets/Header/Header';

import {
  saleProducts,
  trendingProducts,
} from '../HomePage/homePage.data';

import './CategoryPage.css';

const { Text, Title } = Typography;

type SortType =
  | 'expensive'
  | 'cheap'
  | 'rating'
  | 'popular';

const brandOptions = [
  'PUMIEY',
  'Abardsion',
  'Trendy Queen',
  'Roselux',
  'Darong',
  'KevaMolly',
  'AUTOMET',
  'PUMA',
  'H&M',
];

const fabricOptions = [
  'Polyamide',
  'Elastane',
  'Cotton',
  'Silk',
  'Nylon',
  'Chiffon',
  'Satin',
  'Sateen',
  'Stockinet',
];

const colorOptions = [
  'White',
  'Black',
  'Red',
  'Yellow',
  'Orange',
  'Green',
  'Azure',
  'Blue',
  'Purple',
  'Silver',
  'Brown',
];

const sizes = [
  '2XS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
  '4XL',
  '5XL',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48',
  '50',
];

const ratingOptions = [5, 4, 3, 2, 1];

const productsPerPage = 12;

export const CategoryPage = () => {
  const [viewMode, setViewMode] = useState<
    'grid' | 'list'
  >('grid');

  const [selectedBrands, setSelectedBrands] =
    useState<string[]>([]);

  const [selectedFabrics, setSelectedFabrics] =
    useState<string[]>([]);

  const [selectedColors, setSelectedColors] =
    useState<string[]>([]);

  const [selectedSizes, setSelectedSizes] =
    useState<string[]>([]);

  /*
   * SEARCH INSIDE FILTERS
   */
  const [brandSearch, setBrandSearch] =
    useState('');

  const [fabricSearch, setFabricSearch] =
    useState('');

  const [sizeSearch, setSizeSearch] =
    useState('');

  const [colorSearch, setColorSearch] =
    useState('');

  /*
   * PRICE
   */
  const [priceRange, setPriceRange] = useState<
    [number, number]
  >([0, 150]);

  const [appliedPriceRange, setAppliedPriceRange] =
    useState<[number, number]>([0, 150]);

  /*
   * RATING
   */
  const [selectedRating, setSelectedRating] =
    useState<number | null>(4);

  /*
   * SORT
   */
  const [sortType, setSortType] =
    useState<SortType>('expensive');

  /*
   * PAGINATION
   */
  const [currentPage, setCurrentPage] =
    useState(1);

  /*
   * LOCAL PRODUCTS
   */
  const products = [
    ...trendingProducts,
    ...saleProducts,
  ];

  /*
   * SEARCHED FILTER OPTIONS
   */
  const filteredBrandOptions =
    brandOptions.filter((brand) =>
      brand
        .toLowerCase()
        .includes(
          brandSearch.toLowerCase(),
        ),
    );

  const filteredFabricOptions =
    fabricOptions.filter((fabric) =>
      fabric
        .toLowerCase()
        .includes(
          fabricSearch.toLowerCase(),
        ),
    );

  const filteredSizeOptions =
    sizes.filter((size) =>
      size
        .toLowerCase()
        .includes(
          sizeSearch.toLowerCase(),
        ),
    );

  const filteredColorOptions =
    colorOptions.filter((color) =>
      color
        .toLowerCase()
        .includes(
          colorSearch.toLowerCase(),
        ),
    );

  /*
   * BRAND
   */
  const handleBrandChange = (
    brand: string,
    checked: boolean,
  ) => {
    setSelectedBrands((prev) =>
      checked
        ? [...prev, brand]
        : prev.filter(
            (item) => item !== brand,
          ),
    );
  };

  /*
   * FABRIC
   */
  const handleFabricChange = (
    fabric: string,
    checked: boolean,
  ) => {
    setSelectedFabrics((prev) =>
      checked
        ? [...prev, fabric]
        : prev.filter(
            (item) => item !== fabric,
          ),
    );
  };

  /*
   * COLOR
   */
  const handleColorChange = (
    color: string,
    checked: boolean,
  ) => {
    setSelectedColors((prev) =>
      checked
        ? [...prev, color]
        : prev.filter(
            (item) => item !== color,
          ),
    );
  };

  /*
   * SIZE
   */
  const handleSizeChange = (
    size: string,
  ) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter(
            (item) => item !== size,
          )
        : [...prev, size],
    );
  };

  /*
   * PRICE
   */
  const handleApplyPrice = () => {
    setAppliedPriceRange(priceRange);
  };

  /*
   * RATING
   */
  const handleRatingChange = (
    rating: number,
    checked: boolean,
  ) => {
    if (checked) {
      setSelectedRating(rating);
      return;
    }

    if (selectedRating === rating) {
      setSelectedRating(null);
    }
  };

  /*
   * PRODUCT FILTERS
   */
  const filteredProducts = products.filter(
    (product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesFabric =
        selectedFabrics.length === 0 ||
        selectedFabrics.includes(product.fabric);

      const matchesColor =
        selectedColors.length === 0 ||
        selectedColors.includes(product.color);

      const matchesSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) =>
          product.sizes.includes(size),
        );

      const matchesPrice =
        product.price >= appliedPriceRange[0] &&
        product.price <= appliedPriceRange[1];

      const matchesRating =
        selectedRating === null ||
        product.rating >= selectedRating;

      return (
        matchesBrand &&
        matchesFabric &&
        matchesColor &&
        matchesSize &&
        matchesPrice &&
        matchesRating
      );
    },
  );

  /*
   * SORT PRODUCTS
   */
  const sortedProducts = [
    ...filteredProducts,
  ].sort((a, b) => {
    switch (sortType) {
      case 'expensive':
        return b.price - a.price;

      case 'cheap':
        return a.price - b.price;

      case 'rating':
        return b.rating - a.rating;

      case 'popular':
        return (
          b.reviewsCount -
          a.reviewsCount
        );

      default:
        return 0;
    }
  });

  /*
   * PAGINATION
   */
  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    sortedProducts.slice(
      startIndex,
      endIndex,
    );

  /*
   * RESET CURRENT PAGE
   * AFTER FILTERS CHANGE
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBrands,
    selectedFabrics,
    selectedColors,
    selectedSizes,
    appliedPriceRange,
    selectedRating,
    sortType,
  ]);

  /*
   * ACTIVE FILTERS COUNTER
   */
  const activeFiltersCount =
    selectedBrands.length +
    selectedFabrics.length +
    selectedColors.length +
    selectedSizes.length +
    (selectedRating !== null ? 1 : 0) +
    (appliedPriceRange[0] !== 0 ||
    appliedPriceRange[1] !== 150
      ? 1
      : 0);

  return (
    <div className="category-page">
      <Header />

      <main className="category-page__main">
        <div className="category-page__container">
          {/* BREADCRUMBS */}

          <Breadcrumb
            className="category-page__breadcrumbs"
            items={[
              {
                title: (
                  <Flex align="center" gap={4}>
                    <FiHome />
                    <span>Fashion</span>
                  </Flex>
                ),
              },
              {
                title: "Women's fashion",
              },
              {
                title:
                  "Casual women's clothing",
              },
            ]}
          />

          {/* TITLE */}

          <Title
            level={1}
            className="category-page__title"
          >
            Dresses
          </Title>

          <Flex
            className="category-page__layout"
            align="flex-start"
          >
            <aside className="category-page__sidebar">

              {/* BRAND */}

              <Collapse
                className="category-filter"
                defaultActiveKey={['brand']}
                ghost
                items={[
                  {
                    key: 'brand',
                    label: 'Brand',

                    children: (
                      <Flex vertical gap={10}>
                        <Input
                          className="category-filter__search"
                          prefix={<FiSearch />}
                          placeholder="Search..."
                          value={brandSearch}
                          onChange={(event) =>
                            setBrandSearch(
                              event.target.value,
                            )
                          }
                          allowClear
                        />

                        <Flex
                          className="category-filter__options"
                          vertical
                          gap={5}
                        >
                          {filteredBrandOptions.map(
                            (brand) => (
                              <Checkbox
                                key={brand}
                                checked={selectedBrands.includes(
                                  brand,
                                )}
                                onChange={(event) =>
                                  handleBrandChange(
                                    brand,
                                    event.target.checked,
                                  )
                                }
                              >
                                {brand}
                              </Checkbox>
                            ),
                          )}

                          {filteredBrandOptions.length ===
                            0 && (
                            <Text type="secondary">
                              Nothing found
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                    ),
                  },
                ]}
              />

              {/* FABRIC */}

              <Collapse
                className="category-filter"
                defaultActiveKey={['fabric']}
                ghost
                items={[
                  {
                    key: 'fabric',
                    label: 'Fabric type',

                    children: (
                      <Flex vertical gap={10}>
                        <Input
                          className="category-filter__search"
                          prefix={<FiSearch />}
                          placeholder="Search..."
                          value={fabricSearch}
                          onChange={(event) =>
                            setFabricSearch(
                              event.target.value,
                            )
                          }
                          allowClear
                        />

                        <Flex
                          className="category-filter__options"
                          vertical
                          gap={5}
                        >
                          {filteredFabricOptions.map(
                            (fabric) => (
                              <Checkbox
                                key={fabric}
                                checked={selectedFabrics.includes(
                                  fabric,
                                )}
                                onChange={(event) =>
                                  handleFabricChange(
                                    fabric,
                                    event.target.checked,
                                  )
                                }
                              >
                                {fabric}
                              </Checkbox>
                            ),
                          )}

                          {filteredFabricOptions.length ===
                            0 && (
                            <Text type="secondary">
                              Nothing found
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                    ),
                  },
                ]}
              />

              {/* SIZE */}

              <Collapse
                className="category-filter"
                defaultActiveKey={['size']}
                ghost
                items={[
                  {
                    key: 'size',
                    label: 'Size',

                    children: (
                      <Flex vertical gap={10}>
                        <Input
                          className="category-filter__search"
                          prefix={<FiSearch />}
                          placeholder="Search..."
                          value={sizeSearch}
                          onChange={(event) =>
                            setSizeSearch(
                              event.target.value,
                            )
                          }
                          allowClear
                        />

                        <div className="category-filter__sizes">
                          {filteredSizeOptions.map(
                            (size) => (
                              <Button
                                key={size}
                                className={
                                  selectedSizes.includes(
                                    size,
                                  )
                                    ? 'category-filter__size category-filter__size--active'
                                    : 'category-filter__size'
                                }
                                onClick={() =>
                                  handleSizeChange(
                                    size,
                                  )
                                }
                              >
                                {size}
                              </Button>
                            ),
                          )}
                        </div>

                        {filteredSizeOptions.length ===
                          0 && (
                          <Text type="secondary">
                            Nothing found
                          </Text>
                        )}
                      </Flex>
                    ),
                  },
                ]}
              />

              {/* COLOR */}

              <Collapse
                className="category-filter"
                defaultActiveKey={['color']}
                ghost
                items={[
                  {
                    key: 'color',
                    label: 'Color',

                    children: (
                      <Flex vertical gap={10}>
                        <Input
                          className="category-filter__search"
                          prefix={<FiSearch />}
                          placeholder="Search..."
                          value={colorSearch}
                          onChange={(event) =>
                            setColorSearch(
                              event.target.value,
                            )
                          }
                          allowClear
                        />

                        <Flex
                          className="category-filter__options"
                          vertical
                          gap={5}
                        >
                          {filteredColorOptions.map(
                            (color) => (
                              <Checkbox
                                key={color}
                                checked={selectedColors.includes(
                                  color,
                                )}
                                onChange={(event) =>
                                  handleColorChange(
                                    color,
                                    event.target.checked,
                                  )
                                }
                              >
                                {color}
                              </Checkbox>
                            ),
                          )}

                          {filteredColorOptions.length ===
                            0 && (
                            <Text type="secondary">
                              Nothing found
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                    ),
                  },
                ]}
              />

              {/* PRICE */}

              <Collapse
                className="category-filter"
                defaultActiveKey={['price']}
                ghost
                items={[
                  {
                    key: 'price',
                    label: 'Price',

                    children: (
                      <Flex vertical gap={10}>
                        <Flex
                          className="category-filter__price-row"
                          align="center"
                          gap={8}
                        >
                          <Input
                            className="category-filter__price-input"
                            value={priceRange[0]}
                            readOnly
                          />

                          <Text>—</Text>

                          <Input
                            className="category-filter__price-input"
                            value={priceRange[1]}
                            readOnly
                          />

                          <Button
                            className="category-filter__save"
                            type="primary"
                            onClick={
                              handleApplyPrice
                            }
                          >
                            Save
                          </Button>
                        </Flex>

                        <Slider
                          range
                          min={0}
                          max={150}
                          value={priceRange}
                          onChange={(value) =>
                            setPriceRange(
                              value as [
                                number,
                                number,
                              ],
                            )
                          }
                        />
                      </Flex>
                    ),
                  },
                ]}
              />

              {/* CUSTOMER REVIEWS */}

              <Collapse
                className="category-filter"
                defaultActiveKey={[
                  'reviews',
                ]}
                ghost
                items={[
                  {
                    key: 'reviews',
                    label:
                      'Customer reviews',

                    children: (
                      <Flex vertical gap={5}>
                        {ratingOptions.map(
                          (rating) => (
                            <Checkbox
                              key={rating}
                              checked={
                                selectedRating ===
                                rating
                              }
                              onChange={(event) =>
                                handleRatingChange(
                                  rating,
                                  event.target.checked,
                                )
                              }
                            >
                              <Rate
                                className="category-filter__rating"
                                disabled
                                value={rating}
                                count={5}
                              />
                            </Checkbox>
                          ),
                        )}
                      </Flex>
                    ),
                  },
                ]}
              />
            </aside>

            {/* PRODUCTS */}

            <section className="category-page__products">

              {/* TOOLBAR */}

              <Flex
                className="category-toolbar"
                align="center"
                justify="space-between"
              >
                <Select
                  className="category-toolbar__filters"
                  value={`${activeFiltersCount} filters applied`}
                  options={[
                    {
                      value: `${activeFiltersCount} filters applied`,
                      label: `${activeFiltersCount} filters applied`,
                    },
                  ]}
                />

                <Flex
                  align="center"
                  gap={16}
                >
                  <Select
                    className="category-toolbar__sort"
                    value={sortType}
                    onChange={(
                      value: SortType,
                    ) =>
                      setSortType(value)
                    }
                    options={[
                      {
                        value:
                          'expensive',
                        label:
                          'Expensive to cheap',
                      },
                      {
                        value:
                          'cheap',
                        label:
                          'Cheap to expensive',
                      },
                      {
                        value:
                          'rating',
                        label:
                          'By rating',
                      },
                      {
                        value:
                          'popular',
                        label:
                          'Most popular',
                      },
                    ]}
                  />

                  <Flex className="category-toolbar__views">
                    <Button
                      className={
                        viewMode === 'grid'
                          ? 'category-toolbar__view category-toolbar__view--active'
                          : 'category-toolbar__view'
                      }
                      icon={<FiGrid />}
                      onClick={() =>
                        setViewMode('grid')
                      }
                      aria-label="Grid view"
                    />

                    <Button
                      className={
                        viewMode === 'list'
                          ? 'category-toolbar__view category-toolbar__view--active'
                          : 'category-toolbar__view'
                      }
                      icon={<FiList />}
                      onClick={() =>
                        setViewMode('list')
                      }
                      aria-label="List view"
                    />
                  </Flex>
                </Flex>
              </Flex>

              {/* PRODUCT GRID */}

              <div
                className={
                  viewMode === 'grid'
                    ? 'category-products-grid'
                    : 'category-products-grid category-products-grid--list'
                }
              >
                {currentProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ),
                )}
              </div>

              {/* EMPTY RESULT */}

              {sortedProducts.length === 0 && (
                <Flex
                  className="category-page__empty"
                  vertical
                  align="center"
                  justify="center"
                  gap={8}
                >
                  <Title level={3}>
                    No products found
                  </Title>

                  <Text>
                    Try changing the filters.
                  </Text>
                </Flex>
              )}

              {/* PAGINATION */}

              {sortedProducts.length > 0 && (
                <Flex
                  className="category-page__pagination"
                  justify="center"
                >
                  <Pagination
                    current={currentPage}
                    total={sortedProducts.length}
                    pageSize={productsPerPage}
                    showSizeChanger={false}
                    onChange={(page) => {
                      setCurrentPage(page);

                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  />
                </Flex>
              )}
            </section>
          </Flex>
        </div>
      </main>

      <ScrollToTop />

      <Footer />
    </div>
  );
};