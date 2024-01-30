import { useIonViewDidEnter } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';

const PackageDetail: React.FC = () => {
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
    const {id} = useParams<any>()
    useIonViewDidEnter(() => {
        debugger
        const data = lstData.find(x => x.key === id)
        console.log('data', data)
    })

    return (
        <></>
    )
}

export default PackageDetail