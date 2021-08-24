import React from 'react'
import {Modal, Form, Input} from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
    const {isAddRoomVisiable, setIsAddRoomVisible} = React.useContext(AppContext);
    const {user: {uid}} = React.useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', {...form.getFieldValue(), members: [uid]});
        
        form.resetFields();
        setIsAddRoomVisible(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    }

    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisiable}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item label="Tên phòng" name='name'>
                        <Input placeholder="Nhập tên phòng"></Input>
                    </Form.Item>

                    <Form.Item label="Mô tả" name='description'>
                        <Input.TextArea placeholder="Nhập mô tả"></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
