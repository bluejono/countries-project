import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CardNav from '@/components/ui/CardNav';

function Details() {
  const { id } = useParams();

  const navItems = [
    {
      label: 'Intro',
      bgColor: '#1e3a8a',
      textColor: '#ffffff',
      href: '/'
    },
    {
      label: 'Home',
      bgColor: '#15803d',
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
        ease="back.out(1.7)"
        theme="light"
        items={navItems}
      />
      <div className='bg-linear-to-b from-green-900 to-black min-h-screen flex flex-col items-center justify-center text-white p-10 gap-6'>
        <h1 className="text-5xl font-bold capitalize mb-4">Detalhes: {id}</h1>

        <div className="bg-green-900/40 p-10 rounded-2xl border border-green-700 max-w-2xl text-center flex flex-col gap-6">
          <p className="text-lg">
            Aqui você vai colocar as informações detalhadas sobre o país vindas da API Rest Countries.
          </p>
          <p className="text-gray-300">
            Você pode buscar os dados do país usando o parâmetro da URL ("{id}").
          </p>
        </div>

        <Button asChild variant="secondary" className="mt-8 px-10">
          <Link to="/home">Voltar para Home</Link>
        </Button>
      </div>
    </>
  )
}

export default Details
