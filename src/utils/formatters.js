export function getCountryName(country, language) {
  if (language && language.toLowerCase().startsWith('pt') && country.translations && country.translations.por) {
    return country.translations.por.common;
  }
  return country.name.common;
}
