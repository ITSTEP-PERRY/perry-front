import {
  Card,
  Flex,
  Image,
  Typography,
} from 'antd';

import {
  FiMessageSquare,
  FiStar,
} from 'react-icons/fi';

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
}

interface ProductCardProps {
  product: ProductCardData;
}

const formatPrice = (price: number) => {
  const [integerPart, decimalPart = '00'] =
    price.toFixed(2).split('.');

  return {
    integerPart,
    decimalPart,
  };
};

export const ProductCard = ({
  product,
}: ProductCardProps) => {
  const price = formatPrice(product.price);

  return (
    <Card
      className="product-card"
      bordered={false}
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
        gap={10}
      >
        <div className="product-card__image-wrapper">
          <Image
            className="product-card__image"
            src={product.image}
            alt={product.title}
            preview={false}
          />

          {product.discount !== undefined && (
            <Text className="product-card__discount">
              -{product.discount}%
            </Text>
          )}
        </div>

        <Paragraph
          className="product-card__title"
          ellipsis={{ rows: 2 }}
        >
          {product.title}
        </Paragraph>

        <Flex
          className="product-card__meta"
          align="center"
          justify="center"
          gap={12}
        >
          <Flex align="center" gap={4}>
            <FiStar  className='product-card__star' />
            <Text>{product.rating}</Text>
          </Flex>

          <Flex align="center" gap={4}>
            <FiMessageSquare />
            <Text>{product.reviewsCount}</Text>
          </Flex>
        </Flex>

        <Flex
          className="product-card__prices"
          align="baseline"
          justify="center"
          gap={8}
        >
          <Text className="product-card__price">
            <span className="product-card__currency">
              $
            </span>

            <span>{price.integerPart}</span>

            <sup>{price.decimalPart}</sup>
          </Text>

          {product.oldPrice !== undefined && (
            <Text delete className="product-card__old-price">
              ${product.oldPrice.toFixed(2)}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};