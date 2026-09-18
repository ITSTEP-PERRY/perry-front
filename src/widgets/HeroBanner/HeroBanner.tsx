import {
  Button,
  Image,
} from 'antd';

import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import heroSaleImage from '../../assets/banners/hero-sale.png';

import './HeroBanner.css';

export const HeroBanner = () => {
  const handlePreviousSlide = () => {
    console.log('Previous slide');
  };

  const handleNextSlide = () => {
    console.log('Next slide');
  };

  return (
    <section
      className="hero-banner"
      aria-label="Promotional offers"
    >
      <Image
        className="hero-banner__image"
        src={heroSaleImage}
        alt="Upgrade kitchenware today. Sale up to 50 percent."
        preview={false}
      />

      <Button
        className="hero-banner__arrow hero-banner__arrow--left"
        type="default"
        icon={<FiChevronLeft />}
        aria-label="Previous banner"
        onClick={handlePreviousSlide}
      />

      <Button
        className="hero-banner__arrow hero-banner__arrow--right"
        type="default"
        icon={<FiChevronRight />}
        aria-label="Next banner"
        onClick={handleNextSlide}
      />
    </section>
  );
};