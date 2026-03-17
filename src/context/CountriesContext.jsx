import { createContext, useContext, useState, useEffect } from 'react';
import { countriesService } from '@/api/countriesService';

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
