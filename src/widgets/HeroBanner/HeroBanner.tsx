import { useState } from 'react';

import {
  Button,
  Image,
} from 'antd';

import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

import heroSaleImage from '../../assets/banners/hero-sale.png';
import heroSlide2 from '../../assets/banners/hero-slide-2.svg';

import './HeroBanner.css';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: heroSaleImage,
    alt: 'Upgrade kitchenware today. Sale up to 50 percent.',
  },
  {
    id: 2,
    image: heroSlide2,
    alt: 'Perry special offer',
  },
];

export const HeroBanner = () => {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const handlePrevious = () => {
    setCurrentSlide(
      (previousSlide) =>
        previousSlide === 0
          ? heroSlides.length - 1
          : previousSlide - 1,
    );
  };

  const handleNext = () => {
    setCurrentSlide(
      (previousSlide) =>
        previousSlide ===
        heroSlides.length - 1
          ? 0
          : previousSlide + 1,
    );
  };

  const slide =
    heroSlides[currentSlide];

  return (
    <section
      className="hero-banner"
      aria-label="Promotional banner"
    >
      <Image
        key={slide.id}
        className="hero-banner__image"
        src={slide.image}
        alt={slide.alt}
        preview={false}
      />

      <Button
        type="text"
        className="hero-banner__arrow hero-banner__arrow--left"
        icon={<FiChevronLeft />}
        aria-label="Previous banner"
        onClick={handlePrevious}
      />

      <Button
        type="text"
        className="hero-banner__arrow hero-banner__arrow--right"
        icon={<FiChevronRight />}
        aria-label="Next banner"
        onClick={handleNext}
      />
    </section>
  );
};