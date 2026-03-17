import { Button } from '@/components/ui/button';
import Noise from '@/components/ui/Noise';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Intro() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='bg-neutral-950 min-h-screen flex flex-col items-center justify-center text-white py-20 px-6 gap-10 selection:bg-neutral-800'>
      <Noise
        patternSize={10}
        patternScaleX={.5}
        patternScaleY={.5}
        patternRefreshInterval={2}
        patternAlpha={5}
      />
      <div className="w-full max-w-2xl text-center md:text-left flex flex-col gap-6 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">{t('intro.title')}</h1>
        <p className="text-xl text-neutral-400 font-light leading-relaxed">{t('intro.body1')}</p>
      </div>
      <Button className="w-full md:w-50 cursor-pointer h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all z-10" variant='secondary' onClick={() => navigate('/home')}>{t('intro.button')}</Button>
    </div >
  )
}

export default Intro
