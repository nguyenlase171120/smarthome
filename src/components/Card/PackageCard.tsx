import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import './PackageCard.css'
import useConvert from '../../hooks/useConvert';
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

interface Props {
    lstData: any[],
    title?: string,
    className?: string,
    isShowBtnMore?: boolean
}

const ComboCard: React.FC<Props> = ({lstData, title, className, isShowBtnMore = false}) => {

    const convert = useConvert()
    const history = useHistory()

    const goToDetailPackage = async (item: any) => {
        history.replace(`${EPath.Package}`, {title: item.name})
    }

    return (
        <div className={className}>
            {title && <h5>{title}</h5>}
            <div className='package-card__list'>
            {lstData?.map((item: any) => (
                    <IonCard className='package-card__item' key={item.key} onClick={() => title && goToDetailPackage(item)}>
                        <img src={item.image} />
                        <IonCardHeader>
                            {item.price && <IonCardTitle>{convert.toMoney(item.price)}</IonCardTitle>}
                            {item.desc && <p className='package-card__desc'>{item.desc.length > 35 ? `${item.desc.slice(0, 35)}...` : item.desc}
                            {isShowBtnMore && <a style={{marginTop: 10, textAlign: 'right', marginLeft: 10}}>Xem thêm</a>}</p>}
                            <IonCardSubtitle>{item.name}</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
            ))}
            </div>
        </div>
    )
}

export default ComboCard