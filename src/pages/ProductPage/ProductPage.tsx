import { Button, Flex, Image, Result, Typography } from "antd";

import { FiArrowLeft, FiMessageSquare, FiShoppingCart, FiStar } from "react-icons/fi";

import { useNavigate, useParams } from "react-router";

import { saleProducts, trendingProducts } from "../HomePage/homePage.data";

import './ProductPage.css';

const { Paragraph, Text, Title } = Typography;

const formatPrice = (price: number) => {
    const [integerPart, decimalPart = '00'] = price.toFixed(2).split('.');
    
    return { 
        integerPart, 
        decimalPart, 
    };
};

export const ProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const products = [
        ...trendingProducts,
        ...saleProducts,
    ];

    const product = products.find(
        (item) => item.id === Number(productId),
    );

    if(!product) {
        return (
            <Result 
                status="404"
                title="Product not found"
                subTitle="The product you are looking for does not exist."
                extra={
                    <Button 
                        type="primary"
                        onClick={() => navigate('/')}
                    >
                        Back home
                    </Button>
                }
            />
        );   
    }

    const price = formatPrice(product.price);

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        console.log('Add to cart: ', product.id);
    };

    return(
        <main className="product-page">
            <div className="product-page__container">
                <Button
                    className="product-page__back"
                    type="text"
                    icon={<FiArrowLeft />}
                    onClick={handleBack}
                >
                    Back
                </Button>

                <Flex
                    className="product-page__content"
                    gap={56}
                    align="flex=start"
                >
                    <div className="product-page__image-section">
                        <div className="product-page__image-wrapper">
                            <Image
                                className="product-page__image"
                                src={product.image}
                                alt={product.title}
                                preview={false}
                            />

                            {product.discount !== undefined && (
                                <Text className="product-page__discount">
                                    -{product.discount}%
                                </Text>
                            )}
                        </div>
                    </div>

                    <Flex 
                        className="product-page__info"
                        vertical
                        gap={24}
                    >
                        <Title
                            level={1}
                            className="product-page__title"
                        >
                            {product.title}
                        </Title>

                        <Flex 
                            className="product-page__rating"
                            align="center"
                            gap={20}
                        >
                            <Flex 
                                align="center"
                                gap={6}
                            >
                                <FiStar className="product-page__star" />

                                <Text className="product-page__rating-text">
                                    {product.rating}
                                </Text>
                            </Flex>

                             <Flex
                align="center"
                gap={6}
              >
                <FiMessageSquare />

                <Text className="product-page__reviews">
                  {product.reviewsCount} reviews
                </Text>
              </Flex>
            </Flex>

            <Flex
              className="product-page__prices"
              align="baseline"
              gap={16}
            >
              <Text className="product-page__price">
                <span className="product-page__currency">
                  $
                </span>

                <span>
                  {price.integerPart}
                </span>

                <sup>
                  {price.decimalPart}
                </sup>
              </Text>

              {product.oldPrice !== undefined && (
                <Text
                  delete
                  className="product-page__old-price"
                >
                  ${product.oldPrice.toFixed(2)}
                </Text>
              )}
            </Flex>

            {product.discount !== undefined && (
              <Text className="product-page__saving">
                You save{' '}
                {product.discount}% on this product
              </Text>
            )}

            <Paragraph className="product-page__description">
              Discover {product.title}. This product is
              available in the PERRY marketplace.
            </Paragraph>

            <Button
              className="product-page__cart-button"
              type="primary"
              size="large"
              icon={<FiShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
                </Flex>
            </Flex>
            </div>
        </main>
    );
};