import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import CardNav from '@/components/ui/CardNav';

function Home() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,region,population,cca3');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        // Sort alphabetically by common name
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

  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCountries = countries.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      label: 'Intro',
      bgColor: '#1e3a8a', // blue-900
      textColor: '#ffffff',
      href: '/'
    },
    {
      label: 'Home',
      bgColor: '#15803d', // green-700
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
      <div className='bg-linear-to-b from-green-900 to-black min-h-screen flex flex-col items-center text-white p-10 gap-10 min-h-screen pt-24'>
        <h1 className="text-4xl font-bold mt-10">Países</h1>
        <p className="text-xl max-w-2xl text-center">
          Aqui está a lista de todos os países do mundo!
        </p>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-2xl animate-pulse">Carregando países...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-100 px-6 py-4 rounded-xl max-w-2xl text-center">
            <p className="font-bold text-xl mb-2">Ops! Algo deu errado.</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl mt-6">
              {currentCountries.map((country) => (
                <Link key={country.cca3} to={`/details/${country.name.common.toLowerCase()}`}>
                  <Card className="bg-green-800/40 hover:bg-green-700/60 transition-all duration-300 border-green-600 cursor-pointer h-full flex flex-col items-center text-center group text-white">
                    <CardHeader className="w-full flex flex-col items-center gap-2 pb-2">
                      <div className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                        {country.flag}
                      </div>
                      <CardTitle className="text-xl leading-tight line-clamp-2 min-h-[50px] flex items-center">
                        {country.name.common}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-gray-300 flex-1 flex flex-col justify-end">
                      <p><strong>Região:</strong> {country.region || 'Não informada'}</p>
                      <p><strong>População:</strong> {country.population?.toLocaleString() || 'Não informada'}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 w-full max-w-4xl bg-green-950/40 p-4 rounded-2xl border border-green-800/50">
                <Pagination>
                  <PaginationContent className="flex-wrap justify-center gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`text-white hover:bg-green-800 hover:text-white ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                      />
                    </PaginationItem>

                    {/* Simplified Page Numbers for Mobile Friendliness */}
                    {currentPage > 2 && (
                      <PaginationItem className="hidden sm:block">
                        <PaginationLink onClick={() => handlePageChange(1)} className="text-white hover:bg-green-800 hover:text-white">
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage > 3 && (
                      <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis className="text-white" />
                      </PaginationItem>
                    )}

                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(currentPage - 1)} className="text-white hover:bg-green-800 hover:text-white">
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink isActive className="bg-green-700 text-white hover:bg-green-600 hover:text-white border-green-500">
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(currentPage + 1)} className="text-white hover:bg-green-800 hover:text-white">
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage < totalPages - 2 && (
                      <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis className="text-white" />
                      </PaginationItem>
                    )}

                    {currentPage < totalPages - 1 && (
                      <PaginationItem className="hidden sm:block">
                        <PaginationLink onClick={() => handlePageChange(totalPages)} className="text-white hover:bg-green-800 hover:text-white">
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`text-white hover:bg-green-800 hover:text-white ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Home
