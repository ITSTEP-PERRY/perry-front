import { useRef } from 'react';

import {
  Button,
  Flex,
  Typography,
} from 'antd';

import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import {
  ProductCard,
  type ProductCardData,
} from '../../Components/ProductCard/ProductCard';

import './ProductSection.css';

const { Title, Text } = Typography;

interface ProductSectionProps {
  title: string;
  products: ProductCardData[];
  sectionId: string;
}

export const ProductSection = ({
  title,
  products,
  sectionId,
}: ProductSectionProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (
    direction: 'left' | 'right',
  ) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const cardWidth = 225;
    const cardsGap = 24;
    const scrollDistance = cardWidth + cardsGap;

    list.scrollBy({
      left:
        direction === 'right'
          ? scrollDistance
          : -scrollDistance,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="product-section"
      aria-labelledby={sectionId}
    >
      <Flex
        className="product-section__header"
        align="center"
        justify="space-between"
      >
        <Title
          id={sectionId}
          className="product-section__title"
          level={2}
        >
          {title}
        </Title>

        <Button
          className="product-section__see-all"
          type="text"
        >
          <Text className="product-section__see-all-text">
            See all
          </Text>

          <FiChevronRight />
        </Button>
      </Flex>

      <div className="product-section__carousel">
        <Button
          className="product-section__arrow product-section__arrow--left"
          type="default"
          icon={<FiChevronLeft />}
          aria-label={`Previous ${title} products`}
          onClick={() => scrollProducts('left')}
        />

        <Flex
          ref={listRef}
          className="product-section__list"
          gap={24}
          wrap={false}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </Flex>

        <Button
          className="product-section__arrow product-section__arrow--right"
          type="default"
          icon={<FiChevronRight />}
          aria-label={`Next ${title} products`}
          onClick={() => scrollProducts('right')}
        />
      </div>
    </section>
  );
};