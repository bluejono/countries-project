import { createContext, useContext, useState, useEffect } from 'react';
import { countriesService } from '@/api/countriesService';

/**
 * CountriesContext — provides all countries data globally,
 * so API calls originate from the App level and are shared across pages.
 */
const CountriesContext = createContext(null);

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    countriesService.getAllCountries()
      .then(data => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, isLoading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  return useContext(CountriesContext);
}
