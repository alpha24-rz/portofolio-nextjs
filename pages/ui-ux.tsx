// pages/ui-ux.tsx
import { FC } from 'react';
import '@/app/globals.css'
import Squares from '@/components/background/Squares/Squares';

const UiUxProjectsPage: FC = () => {

  return (
    <div className=" bg-black w-full h-screen overflow-hidden">
      <Squares
        speed={0.5}
        squareSize={40}
        direction='diagonal' // up, down, left, right, diagonal
        borderColor='#271e37'
        hoverFillColor='#353636'
      />

      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <div className='text-white text-4xl font-bold'>
          UI/UX Projects Page
        </div>

        <div className='text-white text-4xl font-bold'>
          UI/UX Projects Page
        </div>
        
        <div className='text-white text-4xl font-bold'>
          UI/UX Projects Page
        </div>

        <div className='text-white text-4xl font-bold'>
          UI/UX Projects Page
        </div>
      </div>
    </div>
  );
};

export default UiUxProjectsPage;
