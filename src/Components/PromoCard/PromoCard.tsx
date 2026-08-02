import {
  Button,
  Card,
  Flex,
  Image,
  Typography,
} from 'antd';

import { FiChevronRight } from 'react-icons/fi';

import './PromoCard.css';

const { Paragraph, Text } = Typography;

export interface PromoCardData {
  id: number;
  title: string;
  image: string;
}

interface PromoCardProps {
  item: PromoCardData;
}

export const PromoCard = ({
  item,
}: PromoCardProps) => {
  const handleSeeAll = () => {
    console.log('Open promotion:', item.id);
  };

  return (
    <Card
      className="promo-card"
      bordered={false}
      styles={{
        body: {
          height: '100%',
          padding: 16,
        },
      }}
    >
      <Flex
        className="promo-card__content"
        vertical
        justify="space-between"
      >
        <Image
          className="promo-card__image"
          src={item.image}
          alt={item.title}
          preview={false}
        />

        <Paragraph
          className="promo-card__title"
          ellipsis={{ rows: 2 }}
        >
          {item.title}
        </Paragraph>

        <Button
          className="promo-card__link"
          type="text"
          onClick={handleSeeAll}
        >
          <Text className="promo-card__link-text">
            See all
          </Text>

          <FiChevronRight />
        </Button>
      </Flex>
    </Card>
  );
};