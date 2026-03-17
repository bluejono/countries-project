import './NotFound.css';
import { useTranslation } from 'react-i18next';

function NotFound({ query }) {
  const { t } = useTranslation();

  return (
    <div className="not-found" role="alert">
      <div className="not-found__icon" aria-hidden="true">🌍</div>
      <h2 className="not-found__title">{t('home.not_found_title')}</h2>
      {query && (
        <p className="not-found__description">
          {t('home.not_found_desc', { query })}
        </p>
      )}
    </div>
  );
}

export default NotFound;
