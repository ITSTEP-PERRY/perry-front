import {
  Button,
  Flex,
  Image,
  Typography,
} from 'antd';

import authBannerBackground from '../../assets/banners/auth-banner-background.png';

import './AuthBanner.css';

const { Title, Text } = Typography;

interface AuthBannerProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

export const AuthBanner = ({
  onLogin,
  onSignUp,
}: AuthBannerProps) => {
  return (
    <section
      className="auth-banner"
      aria-labelledby="auth-banner-title"
    >
      <Image
        className="auth-banner__background"
        src={authBannerBackground}
        alt=""
        preview={false}
        aria-hidden="true"
      />

      <Flex
        className="auth-banner__content"
        vertical
        align="center"
        gap={32}
      >
        <Flex
          className="auth-banner__text"
          vertical
          align="center"
          gap={8}
        >
          <Title
            id="auth-banner-title"
            className="auth-banner__title"
            level={2}
          >
            Abundance of goods
          </Title>

          <Text className="auth-banner__description">
            Join, choose and buy with confidence!
          </Text>
        </Flex>

        <Flex
          className="auth-banner__actions"
          align="center"
          gap={16}
        >
          <Button
            className="auth-banner__signup"
            type="primary"
            onClick={onSignUp}
          >
            Sign up
          </Button>

          <Button
            className="auth-banner__login"
            onClick={onLogin}
          >
            Log in
          </Button>
        </Flex>
      </Flex>
    </section>
  );
};