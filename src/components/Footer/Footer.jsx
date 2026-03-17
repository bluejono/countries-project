import './Footer.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copy">
          &copy; {year} GeoWorld &mdash; {t('footer.rights')}
        </p>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a
            href="https://restcountries.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.api_source')}
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
