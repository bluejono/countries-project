import { API_URL, HOME_FIELDS, BORDER_FIELDS } from '@/utils/constants';

export const countriesService = {
  /**
   * Fetches all countries with specific fields optimized for the home list.
   */
  getAllCountries: () => {
    return fetch(`${API_URL}/all?fields=${HOME_FIELDS}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch countries');
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  },

  /**
   * Fetches full country details by exact name.
   */
  getCountryDetailsByName: (name) => {
    return fetch(`${API_URL}/name/${name}?fullText=true`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch country details');
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  },

  /**
   * Fetches specific countries by their alpha codes (used for border countries).
   */
  getBorderCountriesByCodes: (codesArray) => {
    const borderCodes = codesArray.join(',');
    return fetch(`${API_URL}/alpha?codes=${borderCodes}&fields=${BORDER_FIELDS}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch border countries');
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  }
};
