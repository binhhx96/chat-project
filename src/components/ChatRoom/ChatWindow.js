import React from 'react'
import styled from 'styled-components';
import {Button, Avatar, Tooltip, Input, Form, Alert} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { toUpper } from 'lodash';

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
                                <Message text="test" photoURL={null} displayName="Binh" createdAt={12313123} />
                                <Message text="test" photoURL={null} displayName="Binh" createdAt={12313123} />
                                <Message text="test" photoURL={null} displayName="Binh" createdAt={12313123} />
                                <Message text="test" photoURL={null} displayName="Binh" createdAt={12313123} />
                            </MessageListStyled>
                            <FormStyled>
                                <Form.Item>
                                    <Input bordered={false} autoComplete="off" />
                                </Form.Item>
                            <Button type="primary">Gửi</Button>    
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
