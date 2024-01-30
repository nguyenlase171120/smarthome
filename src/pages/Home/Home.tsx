import { IonSearchbar } from '@ionic/react';
import './Home.css';
import React, { useState } from 'react';
import PackageCard from '../../components/Card/PackageCard';

const Home: React.FC = () => {
  const lstData = [{
    key: 1,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'FPT Camera 1',
    price: 20000
  }, {
    key: 2,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'FPT Camera 2',
    price: 20000
  }, 
  {
    key: 3,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'FPT Camera 3',
    price: 20000
  },
  {
    key: 4,
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
    name: 'FPT Tivi 1',
    price: 20000
  }]

  const [lstDataResult, setLstDataResult] = useState([...lstData])

  const handleSearch = (e: any) => {
    const value = e.target.value
    setLstDataResult(lstData.filter(d => d.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1))
  }

  return (
      <div className='container-main home-wrapper'>
        <IonSearchbar placeholder='Tìm gói' onInput={(e) => handleSearch(e)} />
        <PackageCard lstData={lstDataResult} />
      </div>
  );
};

export default Home;
