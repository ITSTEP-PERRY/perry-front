import { Flex } from 'antd';

import { AuthBanner } from '../../widgets/AuthBanner/AuthBanner';
import { HeroBanner } from '../../widgets/HeroBanner/HeroBanner';
import { ProductSection } from '../../widgets/ProductSection/ProductSection';
import { PromoSection } from '../../widgets/PromoSection/PromoSection';

import {
  bottomPromoItems,
  saleProducts,
  topPromoItems,
  trendingProducts,
} from './homePage.data';

import './HomePage.css';

export const HomePage = () => {
  const handleLogin = () => {
    console.log('Login');
  };

  const handleSignUp = () => {
    console.log('Sign up');
  };

  return (
    <Flex
      className="home-page"
      vertical
    >
      <main className="home-page__content">
        <Flex
          className="home-page__sections"
          vertical
          gap={16}
        >
          <HeroBanner />

          <PromoSection
            items={topPromoItems}
            ariaLabel="Featured promotions"
          />

          <ProductSection
            title="Trending deals"
            products={trendingProducts}
            sectionId="trending-deals-title"
          />

          <PromoSection
            items={bottomPromoItems}
            ariaLabel="More product promotions"
            withTopBorder
          />

          <ProductSection
            title="Sale"
            products={saleProducts}
            sectionId="sale-title"
          />

          <AuthBanner
            onLogin={handleLogin}
            onSignUp={handleSignUp}
          />
        </Flex>
      </main>
    </Flex>
  );
};