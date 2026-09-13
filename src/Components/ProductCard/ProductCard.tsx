import type {
  KeyboardEvent,
  MouseEvent,
} from 'react';

import {
  Button,
  Card,
  Flex,
  Image,
  Typography,
} from 'antd';

import {
  FiMessageSquare,
  FiStar,
} from 'react-icons/fi';

import { useNavigate } from 'react-router';

import './ProductCard.css';

const { Paragraph, Text } = Typography;

export interface ProductCardData {
  id: number;

  title: string;

  image: string;

  price: number;

  oldPrice?: number;

  discount?: number;

  rating: number;

  reviewsCount: number;

  brand: string;

  fabric: string;

  color: string;

  sizes: string[];

  inStock?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
}

const formatPrice = (
  price: number,
) => {
  const [
    integerPart,
    decimalPart = '00',
  ] = price
    .toFixed(2)
    .split('.');

  return {
    integerPart,
    decimalPart,
  };
};

export const ProductCard = ({
  product,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const price =
    formatPrice(product.price);

  const isOutOfStock =
    product.inStock === false;

  const handleProductClick =
    () => {
      navigate(
        `/product/${product.id}`,
      );
    };

  const handleProductKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();

      handleProductClick();
    }
  };

  const handleNotifyClick = (
    event: MouseEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
  };

  return (
    <Card
      className={`product-card ${
        isOutOfStock
          ? 'product-card--out-of-stock'
          : ''
      }`}
      bordered={false}
      onClick={handleProductClick}
      onKeyDown={
        handleProductKeyDown
      }
      role="link"
      tabIndex={0}
      styles={{
        body: {
          height: '100%',
          padding: 16,
        },
      }}
    >
      <Flex
        className="product-card__content"
        vertical
      >
        <div className="product-card__image-wrapper">
          <Image
            className="product-card__image"
            src={product.image}
            alt={product.title}
            preview={false}
          />

          {product.discount !==
            undefined && (
            <Text className="product-card__discount">
              -{product.discount}%
            </Text>
          )}

          {isOutOfStock && (
            <div className="product-card__out-of-stock-overlay">
              <Text className="product-card__out-of-stock-title">
                Out of stock
              </Text>

              <Button
                className="product-card__notify"
                type="primary"
                onClick={
                  handleNotifyClick
                }
              >
                Notify me
              </Button>
            </div>
          )}
        </div>

        <Paragraph
          className="product-card__title"
          ellipsis={{
            rows: 2,
          }}
        >
          {product.title}
        </Paragraph>

        <Flex
          className="product-card__meta"
          align="center"
          justify="center"
        >
          <Flex
            className="product-card__rating"
            align="center"
          >
            <FiStar className="product-card__star" />

            <Text>
              {product.rating}
            </Text>
          </Flex>

          <Flex
            className="product-card__reviews"
            align="center"
          >
            <FiMessageSquare />

            <Text>
              {
                product.reviewsCount
              }
            </Text>
          </Flex>
        </Flex>

        <Flex
          className="product-card__prices"
          align="baseline"
          justify="center"
        >
          <Text className="product-card__price">
            <span className="product-card__currency">
              $
            </span>

            <span>
              {
                price.integerPart
              }
            </span>

            <sup>
              {
                price.decimalPart
              }
            </sup>
          </Text>

          {product.oldPrice !==
            undefined && (
            <Text
              delete
              className="product-card__old-price"
            >
              $
              {product.oldPrice.toFixed(
                2,
              )}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};