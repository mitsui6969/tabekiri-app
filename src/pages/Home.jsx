import React from 'react';
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
    </div>
  );
}

export default Home;
