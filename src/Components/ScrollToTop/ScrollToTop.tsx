import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { FiChevronUp } from 'react-icons/fi';

import './ScrollToTop.css';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      className="scroll-to-top"
      type="primary"
      icon={<FiChevronUp />}
      aria-label="Scroll to top"
      onClick={handleScrollToTop}
    />
  );
};