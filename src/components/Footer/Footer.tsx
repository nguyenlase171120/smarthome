import { CommentOutlined, FileTextOutlined, HomeFilled, PhoneOutlined } from '@ant-design/icons';
import { IonFooter, IonToolbar } from '@ionic/react';
import React from 'react';
import './Footer.css'
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

const Footer: React.FC = () => {

    const history = useHistory()

    return (
        <IonFooter>
            <IonToolbar class='custome-toolbar'>
                <div className='container-main'>
                    <div className='footer-group__button'>
                        <button className='active' onClick={() => history.push(EPath.Home)}>
                            {/* <HomeOutlined />  */}
                            <HomeFilled />
                            <div>Trang chủ</div>
                        </button>
                        <button>
                            <FileTextOutlined />
                            <div>Hợp đồng</div>
                        </button>
                        <button>
                            <PhoneOutlined /> 
                            <div>Hỗ trợ</div>
                        </button>
                        <button>
                            <CommentOutlined /> 
                            <div>Chat</div>
                        </button>
                    </div>
                </div>
            </IonToolbar>
        </IonFooter>
    )
}

export default Footer