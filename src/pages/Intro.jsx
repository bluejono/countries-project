import { Button } from '@/components/ui/button';
import Noise from '@/components/ui/Noise';
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  return (
    <div className='bg-linear-to-b from-green-900 to-black min-h-screen flex flex-col items-center text-white py-30 gap-10'>
      <Noise
        patternSize={10}
        patternScaleX={.5}
        patternScaleY={.5}
        patternRefreshInterval={2}
        patternAlpha={5}
      />
      <div className="w-full max-w-2xl text-left flex flex-col gap-10">
        <h1 className="text-4xl font-bold mb-4">Olá, mundo!</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam pariatur ipsam reiciendis distinctio iste corporis voluptate, vel et dolor porro. Blanditiis quibusdam molestias magnam architecto similique, minus beatae explicabo praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis, sed, perferendis illo repudiandae ad libero nulla cupiditate minima ipsum quod. Quas repellendus vel dolores sed mollitia commodi unde animi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime nemo eveniet dolorum nam modi dolor ab similique! Doloremque corrupti assumenda, officia fugit officiis totam nam unde quos, laboriosam culpa doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem eum, recusandae ullam magnam sit ad praesentium vitae ea quam earum adipisci iusto quos tenetur totam velit dolore saepe architecto?</p>
      </div>
      <Button className="w-50" variant='secondary' onClick={() => navigate('/home')}>Ir para o app</Button>
    </div >
  )
}

export default Intro
