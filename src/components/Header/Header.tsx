import { BellOutlined } from '@ant-design/icons';
import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Header.css'

const Header: React.FC = () => {
    return (
    <IonHeader className="header-wrapper">
        <IonToolbar className='custome-toolbar'>
            <IonTitle slot='start' class='title-page container-main'>Smart Home</IonTitle>
            <IonButtons slot='end'>
                <IonButton>
                    <BellOutlined className='icon-notify' />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    )
}

export default Header