import { CommentOutlined, FileTextOutlined, HomeFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { IonFooter, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Footer.css'
import { useHistory } from 'react-router';
import { EPath } from '../../enums/path';

const Footer: React.FC = () => {

    const history = useHistory()
    const [isShowEleCommon, setIsShowEleCommon] = useState(false)
    const arrPath = [EPath.Home, EPath.Package]
    
    useEffect(() => {
        const unListen = history.listen(async () => {
            const pathName = history.location.pathname

            if(arrPath.findIndex(x => pathName.indexOf(x) > -1) > -1) setIsShowEleCommon(true)
            else setIsShowEleCommon(false)
        })

        return () => unListen()
    }, [history])

    return (
        <>
        {isShowEleCommon && <IonFooter>
            <IonToolbar class='custome-toolbar'>
                <div className='container-main'>
                    <div className='footer-group__button'>
                        <button className='active' onClick={() => history.replace(EPath.Home)}>
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
                            <UserOutlined /> 
                            <div>Tài khoản</div>
                        </button>
                    </div>
                </div>
            </IonToolbar>
        </IonFooter>}
        </>
    )
}

export default Footer