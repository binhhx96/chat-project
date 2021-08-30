import React, {useState} from 'react'
import styled from 'styled-components';
import {Button, Avatar, Tooltip, Input, Form, Alert} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import {addDocument} from '../../firebase/service';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-item: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-itemt: center;  
`;

const WapperStyled = styled.div`
    height: 100vh;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-item: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230,230,230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

const MessageListStyled = styled.div`
    max-heigh: 100%:
    over-flow-y: auto;
`;

//type buton = text de khong co border ben ngoai
export default function ChatWindow() {
    const {selectedRoom, members, setIsInviteMemberVisible} = React.useContext(AppContext);
    const {user: {uid, photoURL, displayName}} = React.useContext(AuthContext);
    const [form] = Form.useForm();

    const [inputValue, setinputValue] = useState('');

    const handleOnChange = (e) => {
        setinputValue(e.target.value);
    }

    const handleSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        });

        form.resetFields(['message']);
    }

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom?.id,
    }), [selectedRoom?.id])
    
    const messages = useFirestore('messages', condition);

    return (
        <WapperStyled>
            {
                selectedRoom ? (
                    <>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{selectedRoom.name}</p>
                                <span className="header__description">{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyled>
                                <Button type="text" icon={<UserAddOutlined onClick={() => setIsInviteMemberVisible(true)}/>}>Mời</Button>
                                <Avatar.Group size="small" maxCount={2}>
                                    {
                                        members.map(member => <Tooltip title={member.displayName} key={member.id}><Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar></Tooltip>)
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled>
                                {
                                    messages.map(message => <Message text={message.text} photoURL={message.photoURL} displayName={message.displayName} createdAt={message.createdAt} key={message.id}/>)
                                }
                            </MessageListStyled>
                            <FormStyled form={form}>
                                <Form.Item name="message">
                                    <Input 
                                        onChange={handleOnChange}
                                        onPressEnter={handleSubmit}
                                        placeholder="Nhập tin nhắn ..." 
                                        bordered={false} 
                                        autoComplete="off" />
                                </Form.Item>
                            <Button type="primary" onClick={handleSubmit}>Gửi</Button>    
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : (
                    <Alert message='Hãy chọn phòng' type='info' showIcon style={{ margin: 5 }} closable />
                )
            }
        </WapperStyled>
    )
}
