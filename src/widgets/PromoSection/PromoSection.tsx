import {
  useEffect,
  useRef,
} from 'react';

import {
  Button,
  Flex,
} from 'antd';

import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import {
  PromoCard,
  type PromoCardData,
} from '../../Components/PromoCard/PromoCard';

import './PromoSection.css';

interface PromoSectionProps {
  items: PromoCardData[];
  ariaLabel?: string;
  withTopBorder?: boolean;
}

export const PromoSection = ({
  items,
  ariaLabel = 'Product promotions',
  withTopBorder = false,
}: PromoSectionProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, [items]);

  const scrollCards = (
    direction: 'left' | 'right',
  ) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const scrollDistance = 239 + 24;

    list.scrollBy({
      left:
        direction === 'right'
          ? scrollDistance
          : -scrollDistance,
      behavior: 'smooth',
    });
  };

  const sectionClassName = withTopBorder
    ? 'promo-section promo-section--bordered'
    : 'promo-section';

  return (
    <section
      className={sectionClassName}
      aria-label={ariaLabel}
    >
      <Button
        className="promo-section__arrow promo-section__arrow--left"
        type="default"
        icon={<FiChevronLeft />}
        aria-label="Previous promotions"
        onClick={() => scrollCards('left')}
      />

      <Flex
        ref={listRef}
        className="promo-section__list"
        gap={24}
        wrap={false}
      >
        {items.map((item) => (
          <PromoCard
            key={item.id}
            item={item}
          />
        ))}
      </Flex>

      <Button
        className="promo-section__arrow promo-section__arrow--right"
        type="default"
        icon={<FiChevronRight />}
        aria-label="Next promotions"
        onClick={() => scrollCards('right')}
      />
    </section>
  );
};