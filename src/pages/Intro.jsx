import { Button } from '@/components/ui/button';
import Noise from '@/components/ui/Noise';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Intro() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language && i18n.language.startsWith('en');

  const toggleLanguage = (checked) => {
    i18n.changeLanguage(checked ? 'en' : 'pt');
  };

  return (
    <div className='bg-neutral-950 min-h-screen flex flex-col items-center justify-center text-white py-20 px-6 gap-10 selection:bg-neutral-800'>
      <Noise
        patternSize={10}
        patternScaleX={.5}
        patternScaleY={.5}
        patternRefreshInterval={2}
        patternAlpha={5}
      />
      <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 z-10 text-white">
        <span className="text-xs font-bold font-mono text-neutral-200">PT</span>
        <Switch
          checked={isEn}
          onCheckedChange={toggleLanguage}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-green-600 cursor-pointer"
          title="Trocar Idioma"
        />
        <span className="text-xs font-bold font-mono text-neutral-200">EN</span>
      </div>
      <div className="w-full max-w-2xl text-center md:text-left flex flex-col gap-6 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">{t('intro.title')}</h1>
        <p className="text-xl text-neutral-400 font-light leading-relaxed">{t('intro.body1')}</p>
      </div>
      <Button className="w-full md:w-50 cursor-pointer h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all z-10" variant='secondary' onClick={() => navigate('/home')}>{t('intro.button')}</Button>
    </div >
  )
}

export default Intro
