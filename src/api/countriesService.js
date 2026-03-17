const API_URL = import.meta.env.VITE_API_URL || 'https://restcountries.com/v3.1';

export const countriesService = {
  /**
   * Fetches all countries with specific fields optimized for the home list.
   */
  getAllCountries: async () => {
    const response = await fetch(`${API_URL}/all?fields=name,flag,flags,region,population,cca3,currencies,languages,translations`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  },

  /**
   * Fetches full country details by exact name.
   */
  getCountryDetailsByName: async (name) => {
    const response = await fetch(`${API_URL}/name/${name}?fullText=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch country details');
    }
    return response.json();
  },

  /**
   * Fetches specific countries by their alpha codes (used for border countries).
   */
  getBorderCountriesByCodes: async (codesArray) => {
    const borderCodes = codesArray.join(',');
    const response = await fetch(`${API_URL}/alpha?codes=${borderCodes}&fields=name,cca3,translations`);
    if (!response.ok) {
      throw new Error('Failed to fetch border countries');
    }
    return response.json();
  }
};
