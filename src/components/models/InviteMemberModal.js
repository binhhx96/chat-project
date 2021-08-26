import React, {useState} from 'react'
import {Modal, Form, Select, Spin, Avatar} from 'antd';
import { debounce } from 'lodash';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import {db} from '../../firebase/config';

function DebounceSelect({fetchOptions, debounceTimeout = 300, ...props}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            });
        }

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select 
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {
                options.map(option => (
                    <Select.Option key={option.value} value={option.value} title={option.label}>
                        <Avatar size="small" src={option.photoURL}>
                            {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {` ${option.label} `}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList(search, currentMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            })).filter(opt => !currentMembers.includes(opt.value));
        })

}

export default function InviteMemberModal() {
    const {selectedRoomId,selectedRoom, isInviteMemberVisiable, setIsInviteMemberVisible} = React.useContext(AppContext);
    const [form] = Form.useForm();

    const [value, setValue] = useState([]);

    const handleOk = () => {    
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        });

        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={isInviteMemberVisiable}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                       mode="multiple"
                       lable="Tên các thành viên"
                       value={value}
                       placeHolder="Nhập tên thành viên" 
                       fetchOptions={fetchUserList}
                       onChange={newValue => setValue(newValue)}
                       style={{'width': '100%'}}
                       currentMembers={selectedRoom ? selectedRoom.members : []}
                    />
                </Form>
            </Modal>
        </div>
    )
}
