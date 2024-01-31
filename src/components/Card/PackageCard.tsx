import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import './PackageCard.css'
import useConvert from '../../hooks/useConvert';
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

interface Props {
    lstData: any[],
    isShowTitle?: boolean
}

const ComboCard: React.FC<Props> = ({lstData, isShowTitle = true}) => {

    const convert = useConvert()
    const history = useHistory()

    const goToDetailPackage = async (item: any) => {
        history.replace(`${EPath.Package}`, {title: item.name})
    }

    return (
        <>
            {isShowTitle && <h5>Các gói thiết bị</h5>}
            <div className='package-card__list'>
            {lstData?.map((item: any) => (
                    <IonCard className='package-card__item' key={item.key} onClick={() => isShowTitle && goToDetailPackage(item)}>
                        <img src={item.image} />
                        <IonCardHeader>
                            <IonCardTitle>{convert.toMoney(item.price)}</IonCardTitle>
                            <IonCardSubtitle>{item.name}</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
            ))}
            </div>
        </>
    )
}

export default ComboCard