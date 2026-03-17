/**
 * Application-wide constants.
 * All non-variable values (magic numbers / strings) should live here.
 */

// API
export const API_URL = import.meta.env.VITE_API_URL || 'https://restcountries.com/v3.1';

// Pagination / Show More
export const ITEMS_PER_LOAD = 12;

// API fields to request for the home list (reduces payload size)
export const HOME_FIELDS = 'name,flag,flags,region,population,cca3,currencies,languages,translations';

// API fields to request for border country chips
export const BORDER_FIELDS = 'name,cca3,translations';
