import { ArrowRightOutlined, BellOutlined, CaretLeftFilled, CaretRightFilled, CaretRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { IonBackButton, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Header.css'
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

const Header: React.FC = () => {

    const history = useHistory()
    const [isShowBtnBack, setIsShowBtnBack] = useState(false)
    const [titleBack, setTitleBack] = useState('')

    useEffect(() => {
        const unListen = history.listen(async () => {
            const pathName = history.location.pathname
            const { title } = history.location.state as {title: string} || {title: ''}
            if(pathName.indexOf(EPath.Package) > -1) setIsShowBtnBack(true)
            else setIsShowBtnBack(false)

            title && setTitleBack(title)
        })

        return () => unListen()
    }, [history])

    return (
    <IonHeader className="header-wrapper">
        <IonToolbar className='custome-toolbar'>
            {
                isShowBtnBack ? 
                <IonButtons slot='start'>
                    <IonButton className='btn-back title-page' onClick={() => history.replace(EPath.Home)}>
                        <CaretLeftFilled className='icon-back' />
                        {titleBack}
                    </IonButton>
                </IonButtons>
                :
                <IonTitle slot='start' class='title-page container-main'>Smart Home</IonTitle>
            }
            
            <IonButtons slot='end'>
                <IonButton>
                    <ShoppingCartOutlined className='icon-custome' />
                </IonButton>
                <IonButton>
                    <BellOutlined className='icon-custome' />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    )
}

export default Header