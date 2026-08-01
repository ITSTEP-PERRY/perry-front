import { Flex } from 'antd';

import { ScrollToTop } from '../../Components/ScrollToTop/ScrollToTop';

import { AuthBanner } from '../../widgets/AuthBanner/AuthBanner';
import { Footer } from '../../widgets/Footer/Footer';
import { Header } from '../../widgets/Header/Header';
import { HeroBanner } from '../../widgets/HeroBanner/HeroBanner';
import { ProductSection } from '../../widgets/ProductSection/ProductSection';
import { PromoSection } from '../../widgets/PromoSection/PromoSection';
import { SigninSignup } from '../../widgets/SigninSignup';

import {
  bottomPromoItems,
  saleProducts,
  topPromoItems,
  trendingProducts,
} from './homePage.data';

import './HomePage.css';

export const HomePage = () => {
  const handleLogin = () => {
    console.log('Open login form');
  };

  const handleSignUp = () => {
    console.log('Open sign up form');
  };

  return (
    <Flex
      className="home-page"
      vertical
    >
      <Header />

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

          <div className="home-page__signin">
            <SigninSignup />
          </div>
        </Flex>
      </main>

      <Footer />

      <ScrollToTop />
    </Flex>
  );
};