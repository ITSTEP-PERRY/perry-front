import {
  Flex,
  Image,
  Typography,
} from 'antd';

import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiSend,
} from 'react-icons/fi';

import { RiTwitterXLine } from 'react-icons/ri';

import perryLogo from '../../assets/logo/perry-logo.svg';

import './Footer.css';

const { Link, Text, Title } = Typography;

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <Flex
          className="footer__content"
          justify="center"
          gap={112}
        >
          <nav
            className="footer__column"
            aria-labelledby="footer-support-title"
          >
            <Flex vertical gap={8}>
              <Title
                id="footer-support-title"
                className="footer__title"
                level={3}
              >
                Support
              </Title>

              <Link
                className="footer__link"
                href="/contact"
              >
                Contact us
              </Link>

              <Link
                className="footer__link"
                href="/faq"
              >
                FAQ
              </Link>
            </Flex>
          </nav>

          <nav
            className="footer__column"
            aria-labelledby="footer-legal-title"
          >
            <Flex vertical gap={8}>
              <Title
                id="footer-legal-title"
                className="footer__title"
                level={3}
              >
                Legal notice
              </Title>

              <Link
                className="footer__link"
                href="/terms"
              >
                Terms and Conditions
              </Link>

              <Link
                className="footer__link"
                href="/license"
              >
                License agreement
              </Link>

              <Link
                className="footer__link"
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </Flex>
          </nav>

          <div
            className="footer__column"
            aria-labelledby="footer-social-title"
          >
            <Flex vertical gap={8}>
              <Title
                id="footer-social-title"
                className="footer__title"
                level={3}
              >
                Social media
              </Title>

              <Flex
                className="footer__socials"
                align="center"
                gap={12}
              >
                <Link
                  className="footer__social-link"
                  href="#"
                  aria-label="Facebook"
                >
                  <FiFacebook />
                </Link>

                <Link
                  className="footer__social-link"
                  href="#"
                  aria-label="X"
                >
                  <RiTwitterXLine />
                </Link>

                <Link
                  className="footer__social-link"
                  href="#"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </Link>

                <Link
                  className="footer__social-link"
                  href="#"
                  aria-label="Email"
                >
                  <FiMail />
                </Link>

                <Link
                  className="footer__social-link"
                  href="#"
                  aria-label="Telegram"
                >
                  <FiSend />
                </Link>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </div>

      <div className="footer__bottom">
        <Flex
          className="footer__bottom-content"
          align="center"
          justify="center"
          gap={32}
        >
          <Link
            className="footer__logo-link"
            href="/"
            aria-label="Perry home"
          >
            <Image
              className="footer__logo"
              src={perryLogo}
              alt="Perry"
              preview={false}
            />
          </Link>

          <Text className="footer__copyright">
            © 2026 Du Soleil. All rights reserved.
          </Text>
        </Flex>
      </div>
    </footer>
  );
};