import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, useIonViewDidEnter } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import PackageCard from '../../components/Card/PackageCard';
import './PackageDetail.css'
import CommentCard from '../../components/Card/CommentCard'

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
  
  const lstComment = [{
    key: 1,
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'User 1',
    content: "Review 1"
  }, {
    key: 2,
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'User 2',
    content: 'Review 2'
  }, {
    key: 3,
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    name: 'User 3',
    content: 'Review 3'
  }]
    
    const {id} = useParams<any>()
    console.log('id', id)
    const history = useHistory()
    return (
        <div className='container-main content-wrapper detail-package-wrapper'>
          <PackageCard lstData={lstData} isShowTitle={false} />
          <h5>Nhận Xét</h5>
          {lstComment.map((comment: any) => (
            <CommentCard key={comment.key} item={comment} />
          ))}
          <div className='group__button'>
            <button className='btn-chat'>Chat</button>
            <button className='btn-send'>Gửi yêu cầu khảo sát</button>
          </div>
        </div>
    )
}

export default PackageDetail