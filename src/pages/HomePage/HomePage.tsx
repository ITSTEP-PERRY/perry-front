import { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';

import { setAuthStatus, type AuthStatusType } from '../../app/slices/authSlice'; 

import { Flex } from 'antd';

import { ScrollToTop } from '../../Components/ScrollToTop/ScrollToTop';

import { AuthBanner } from '../../widgets/AuthBanner/AuthBanner';
import { Footer } from '../../widgets/Footer/Footer';
import { Header } from '../../widgets/Header/Header';
import { HeroBanner } from '../../widgets/HeroBanner/HeroBanner';
import { ProductSection } from '../../widgets/ProductSection/ProductSection';
import { PromoSection } from '../../widgets/PromoSection/PromoSection';
import { SignInSignUp } from '../../widgets/SigninSignup';

import {
  bottomPromoItems,
  saleProducts,
  topPromoItems,
  trendingProducts,
} from './homePage.data';

import './HomePage.css';

export const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState(false);

  const dispatch = useAppDispatch();

  const openAuthModal = (
    status: AuthStatusType,
  ) => {
    dispatch(
      setAuthStatus({
        status,
      }),
    );

    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Flex
      className="home-page"
      vertical
    >
      <Header
        onProfileClick={() =>
          openAuthModal('signIn')
        }
      />

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
            onLogin={() =>
              openAuthModal('signIn')
            }
            onSignUp={() =>
              openAuthModal('signUp')
            }
          />
        </Flex>
      </main>

      <Footer />

      <ScrollToTop />

      <SignInSignUp
        open={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </Flex>
  );
};