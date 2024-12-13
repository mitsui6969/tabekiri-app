import React from 'react';
import { Footer } from '../components/footer/footer'
import { PointCard } from '../components/PointCard/pointCard';

export function Home() {

  return (
    <div>
      <div>
      </div>
    

      {/* ポイントカードの表示 */}
      <div className='pointCard'>
        <PointCard />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
