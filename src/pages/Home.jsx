import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import CardNav from '@/components/ui/CardNav';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
import SplitText from '@/components/ui/SplitText';
import BlurText from '@/components/ui/BlurText';
import { countriesService } from '@/api/countriesService';
import { getCountryName } from '@/utils/formatters';
import Footer from '@/components/Footer/Footer';
import NotFound from '@/components/NotFound/NotFound';
import { Skeleton } from '@/components/ui/skeleton';
import './Home.css';

function Home() {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const ITEMS_PER_LOAD = 12;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countriesService.getAllCountries();
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const { currencies, languages } = useMemo(() => {
    const curSet = new Set();
    const langSet = new Set();
    countries.forEach(c => {
      if (c.currencies) {
        Object.values(c.currencies).forEach(cur => curSet.add(cur.name));
      }
      if (c.languages) {
        Object.values(c.languages).forEach(lang => langSet.add(lang));
      }
    });
    return {
      currencies: Array.from(curSet).sort(),
      languages: Array.from(langSet).sort()
    };
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter(c => {
      const displayName = getCountryName(c, i18n.language);
      const matchesSearch = displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.name.common.toLowerCase().includes(searchTerm.toLowerCase());

      const cCurrencies = c.currencies ? Object.values(c.currencies).map(cur => cur.name) : [];
      const matchesCurrency = selectedCurrency === 'all' || cCurrencies.includes(selectedCurrency);

      const cLanguages = c.languages ? Object.values(c.languages) : [];
      const matchesLanguage = selectedLanguage === 'all' || cLanguages.includes(selectedLanguage);

      return matchesSearch && matchesCurrency && matchesLanguage;
    }).sort((a, b) => {
      const nameA = getCountryName(a, i18n.language);
      const nameB = getCountryName(b, i18n.language);
      return nameA.localeCompare(nameB);
    });
  }, [countries, searchTerm, selectedCurrency, selectedLanguage, i18n.language]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [searchTerm, selectedCurrency, selectedLanguage]);

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCountries.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  const navItems = [
    {
      label: t('nav.intro'),
      bgColor: '#171717', // neutral-900
      textColor: '#ffffff',
      href: '/'
    },
    {
      label: t('nav.home'),
      bgColor: '#262626', // neutral-800
      textColor: '#ffffff',
      href: '/home'
    }
  ];

  return (
    <>
      <CardNav
        logoAlt="Company Logo"
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        theme="light"
        items={navItems}
      />
      <div className='bg-neutral-950 min-h-screen flex flex-col items-center text-white p-10 gap-10 min-h-screen pt-24 selection:bg-neutral-800'>
        <h1 className="text-4xl font-bold mt-10 tracking-tight text-center">
          <SplitText key={t('home.title')} text={t('home.title')} initialDelay={400} />
        </h1>
        <p className="text-xl max-w-2xl text-center text-neutral-400 font-light">
          <BlurText key={t('home.subtitle')} text={t('home.subtitle')} initialDelay={800} delay={40} />
        </p>

        <div className="w-full max-w-4xl flex flex-col items-center gap-4 mt-8">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={t('home.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900/50 border-neutral-800/80 text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:border-neutral-700 h-13 text-lg pr-12 rounded-xl transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors flex items-center justify-center p-1 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Limpar busca"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-full sm:w-1/2 bg-neutral-900/50 border-neutral-800/80 text-white h-12 cursor-pointer rounded-xl focus:ring-1 focus:ring-neutral-700">
                <SelectValue placeholder={t('home.filter_currency')} />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-neutral-900 border-neutral-800 text-white max-h-60 rounded-xl shadow-xl">
                <SelectItem value="all" className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800">{t('home.all_currencies')}</SelectItem>
                {currencies.map(cur => (
                  <SelectItem key={cur} value={cur} className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800">{cur}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full sm:w-1/2 bg-neutral-900/50 border-neutral-800/80 text-white h-12 cursor-pointer rounded-xl focus:ring-1 focus:ring-neutral-700">
                <SelectValue placeholder={t('home.filter_language')} />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-neutral-900 border-neutral-800 text-white max-h-60 rounded-xl shadow-xl">
                <SelectItem value="all" className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800">{t('home.all_languages')}</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang} className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800">{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl mt-6">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80">
                <Skeleton className="w-full h-40 rounded-none bg-neutral-800" />
                <div className="p-4 flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-3/4 bg-neutral-800 rounded-md" />
                  <Skeleton className="h-3 w-1/3 bg-neutral-800/60 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-100 px-6 py-4 rounded-xl max-w-2xl text-center">
            <p className="font-bold text-xl mb-2">{t('home.error_title')}</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {filteredCountries.length === 0
              ? <NotFound query={searchTerm} />
              : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl mt-6">
                    {visibleCountries.map((country) => (
                      <Link key={country.cca3} to={`/details/${country.name.common.toLowerCase()}`} className="h-full block">
                        <Card className="bg-neutral-900/60 hover:bg-neutral-800 border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 cursor-pointer h-full flex flex-col group text-white overflow-hidden p-0 gap-0 shadow-sm hover:shadow-lg rounded-2xl">
                          <div className="w-full h-40 overflow-hidden bg-neutral-950 shrink-0">
                            <img
                              src={country.flags?.svg || country.flags?.png}
                              alt={country.flags?.alt || `Bandeira de ${country.name.common}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 flex flex-col justify-center items-center text-center h-[96px] gap-2 w-full overflow-hidden">
                            <h3 className="text-[17px] font-semibold leading-tight truncate w-full tracking-tight">
                              {getCountryName(country, i18n.language)}
                            </h3>
                            {country.cca3 && (
                              <span className="px-2.5 py-0.5 bg-neutral-800 text-neutral-400 text-[11px] font-semibold tracking-wider rounded-md border border-neutral-700 shrink-0 uppercase">
                                {country.cca3}
                              </span>
                            )}
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Mostrar mais */}
                  {hasMore && (
                    <div className="mt-10 flex flex-col items-center gap-3">
                      <p className="text-neutral-500 text-sm">
                        {visibleCount} / {filteredCountries.length} {t('home.countries_shown', 'países')}
                      </p>
                      <button
                        onClick={handleShowMore}
                        className="px-8 py-3 rounded-xl font-semibold text-sm text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                      >
                        {t('home.show_more', 'Mostrar mais')}
                      </button>
                    </div>
                  )}

                </>
              )
            }
          </>
        )}

      </div>
      <Footer />
    </>
  )
}

export default Home
