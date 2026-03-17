import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import CardNav from '@/components/ui/CardNav';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { countriesService } from '@/api/countriesService';
import { getCountryName } from '@/utils/formatters';
import Footer from '@/components/Footer/Footer';
import { Skeleton } from '@/components/ui/skeleton';

function Details() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navItems = [
    {
      label: t('nav.intro'),
      bgColor: '#171717',
      textColor: '#ffffff',
      href: '/'
    },
    {
      label: t('nav.home'),
      bgColor: '#262626',
      textColor: '#ffffff',
      href: '/home'
    }
  ];

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await countriesService.getCountryDetailsByName(id);
        
        if (data && data.length > 0) {
          const fetchedCountry = data[0];
          setCountry(fetchedCountry);
          
          if (fetchedCountry.borders && fetchedCountry.borders.length > 0) {
            try {
              const bordersData = await countriesService.getBorderCountriesByCodes(fetchedCountry.borders);
              setBorderCountries(bordersData);
            } catch (err) {
              console.error("Erro ao buscar fronteiras:", err);
            }
          } else {
            setBorderCountries([]);
          }
        } else {
          throw new Error(t('details.error_msg'));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
  }, [id, t]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8 animate-pulse">
          {/* Flag skeleton */}
          <Skeleton className="w-full max-w-md h-64 rounded-3xl bg-neutral-800" />
          {/* Title */}
          <div className="flex flex-col items-center gap-3 w-full">
            <Skeleton className="h-8 w-48 bg-neutral-800 rounded-lg" />
            <Skeleton className="h-4 w-32 bg-neutral-800/60 rounded-md" />
          </div>
          {/* Info card */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <Skeleton className="h-3 w-20 bg-neutral-700/60 rounded" />
                <Skeleton className="h-5 w-32 bg-neutral-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-900/50 border border-red-500 text-red-100 px-6 py-4 rounded-xl max-w-2xl text-center">
          <p className="font-bold text-xl mb-2">{t('home.error_title')}</p>
          <p>{error}</p>
        </div>
      );
    }

    if (!country) return null;

    const currencies = country.currencies 
      ? Object.entries(country.currencies).map(([code, c]) => {
          let translatedName = c.name;
          try {
            const loc = i18n.language.startsWith('pt') ? 'pt-BR' : 'en-US';
            const displayNames = new Intl.DisplayNames([loc], { type: 'currency' });
            const nameFromIntl = displayNames.of(code);
            if (nameFromIntl) {
              translatedName = nameFromIntl.charAt(0).toUpperCase() + nameFromIntl.slice(1);
            }
          } catch (e) {
            // Se o navegador não suportar a sigla ou a API
          }
          return `${translatedName} (${c.symbol || code})`;
        }).join(', ') 
      : t('details.no_data');

    const languages = country.languages 
      ? Object.entries(country.languages).map(([code, name]) => {
          let translatedName = name;
          try {
            const loc = i18n.language.startsWith('pt') ? 'pt-BR' : 'en-US';
            const displayNames = new Intl.DisplayNames([loc], { type: 'language' });
            const nameFromIntl = displayNames.of(code);
            if (nameFromIntl) {
              translatedName = nameFromIntl.charAt(0).toUpperCase() + nameFromIntl.slice(1);
            }
          } catch (e) {
            // Fallback para o nome em inglês provido pela API
          }
          return translatedName;
        }).join(', ') 
      : t('details.no_data');
    
    // Obter nome nativo e traduzido
    const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;
    const translatedName = getCountryName(country, i18n.language);
    
    const tld = country.tld ? country.tld.join(', ') : t('details.no_data');

    return (
      <div className="w-full max-w-5xl animate-in fade-in duration-700 zoom-in-95 fill-mode-forwards mt-6">
        <div className="flex flex-col lg:flex-row gap-8 bg-neutral-900/60 p-6 md:p-8 rounded-3xl border border-neutral-800 shadow-xl overflow-hidden relative">
          
          {/* Fundo Desfocado com a Bandeira (efeito visual) */}
          <div 
            className="absolute inset-0 opacity-10 blur-3xl z-0 pointer-events-none"
            style={{ 
              backgroundImage: `url(${country.flags?.svg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Bandeira Esquerda */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
            <div className="rounded-xl overflow-hidden ring-4 ring-neutral-800/50 shadow-2xl bg-neutral-950">
              <img 
                src={country.flags?.svg} 
                alt={country.flags?.alt || `Bandeira de ${country.name.common}`} 
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          </div>

          {/* Detalhes Direita */}
          <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {translatedName}
            </h1>
            <p className="text-xl text-neutral-400 font-medium mb-6">
              {nativeName !== translatedName && nativeName}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {country.region && (
                <Badge variant="secondary" className="bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 text-sm px-3 py-1 border border-blue-800/50">
                  {country.region}
                </Badge>
              )}
              {country.subregion && (
                <Badge variant="outline" className="text-neutral-300 border-neutral-700 text-sm px-3 py-1">
                  {country.subregion}
                </Badge>
              )}
              {country.cca3 && (
                <Badge variant="default" className="bg-neutral-800 hover:bg-neutral-700 text-sm px-3 py-1 tracking-widest text-neutral-300">
                  {country.cca3}
                </Badge>
              )}
            </div>

            <Separator className="bg-neutral-800 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-1">{t('details.capital')}</p>
                <p className="text-white text-lg">{country.capital ? country.capital.join(', ') : t('details.no_data')}</p>
              </div>

              <div>
                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-1">{t('details.population')}</p>
                <p className="text-white text-lg">{country.population.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-1">{t('details.languages')}</p>
                <p className="text-white text-lg">{languages}</p>
              </div>

              <div>
                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-1">{t('details.currencies')}</p>
                <p className="text-white text-lg">{currencies}</p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">{t('details.tld')}</p>
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <span className="cursor-help inline-flex ml-1.5 text-neutral-500 hover:text-neutral-300 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-neutral-800 border-neutral-700 text-neutral-200">
                        <p>{t('details.tld_tooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-neutral-300 font-mono text-base">{tld}</p>
              </div>
            </div>

            <Separator className="bg-neutral-800 my-6" />

            {country.maps?.googleMaps && (
              <a 
                href={country.maps.googleMaps} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-white font-medium transition-colors border border-neutral-700/50 cursor-pointer mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {t('details.maps')}
              </a>
            )}

            {borderCountries.length > 0 && (
              <div className="mt-2">
                <p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-3">{t('details.borders')}</p>
                <div className="flex flex-wrap gap-3">
                  {borderCountries.map(b => (
                    <Link 
                      key={b.cca3} 
                      to={`/details/${b.name.common.toLowerCase()}`}
                      className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-900/50 transition-all outline-none border border-neutral-700/50 rounded-lg text-sm text-neutral-200 cursor-pointer"
                    >
                      {getCountryName(b, i18n.language)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CardNav
        logoAlt="Company Logo"
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="back.out(1.7)"
        theme="light"
        items={navItems}
      />
      <div className='bg-neutral-950 min-h-screen flex flex-col items-center justify-start text-white p-10 pt-32 pb-20 selection:bg-neutral-800'>
        {renderContent()}

        <Link
          to="/home"
          className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 border border-neutral-600/60 hover:border-neutral-500 shadow-lg hover:shadow-neutral-900/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          {t('details.back')}
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default Details
