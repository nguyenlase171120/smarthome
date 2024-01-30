import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import './PackageCard.css'
import { Col, Row } from 'antd';
import useConvert from '../../hooks/useConvert';
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

interface Props {
    lstData: any[]
}

const ComboCard: React.FC<Props> = ({lstData}) => {

    const convert = useConvert()
    const history = useHistory()

    return <>

        <h5>Các gói thiết bị</h5>
        <Row gutter={[10, 10]}>
            {lstData?.map((item: any) => (
                <Col span={12} key={item.key}>
                    <IonCard className='package-card__item' onClick={() => history.push(`${EPath.Package}/${item.key}`)}>
                        <img src={item.image} />
                        <IonCardHeader>
                            <IonCardTitle>{convert.toMoney(item.price)}</IonCardTitle>
                            <IonCardSubtitle>{item.name}</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </Col>
            ))}
        </Row>
    </>
}

export default ComboCard