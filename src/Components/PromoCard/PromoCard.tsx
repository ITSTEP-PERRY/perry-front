import {
  Button,
  Card,
  Image,
  Typography,
} from 'antd';

import { useNavigate } from 'react-router';

import './PromoCard.css';

const { Title } = Typography;

export interface PromoCardData {
  id: number;
  title: string;
  image: string;

  category: string;
}

interface PromoCardProps {
  item: PromoCardData;
}

export const PromoCard = ({
  item,
}: PromoCardProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(
      `/category/${item.category}`,
    );
  };

  return (
    <Card
      className="promo-card"
      bordered={false}
      styles={{
        body: {
          height: '100%',
        },
      }}
    >
      <Title
        level={3}
        className="promo-card__title"
      >
        {item.title}
      </Title>

      <Image
        className="promo-card__image"
        src={item.image}
        alt={item.title}
        preview={false}
      />

      <Button
        type="link"
        className="promo-card__link"
        onClick={
          handleCategoryClick
        }
      >
        See all
      </Button>
    </Card>
  );
};