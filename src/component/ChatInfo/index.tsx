import React from "react";
import { container } from 'tsyringe';
import { IdentifyService } from '../../services/identify.service';

import { Button, Card, Form, Input, Spin } from 'antd';


const ChatInfo = () => {

    const identifyService = container.resolve(IdentifyService);
    const [spinLoad, setSpinLoad] = React.useState(false)
    const [textResponse, setTextResponse] = React.useState({});


    const prefixSelector = (
        <h4 style={{ paddingTop: 5 }}>+91</h4>
    );

    const onFinish = (values: any) => { // On submiting the form response
        setSpinLoad(true)
        identifyService.createContact(values).then((r) => {
            setTextResponse(r);
            setSpinLoad(false)
        });
    }
    return <Spin spinning={spinLoad} size="large">
        <div className='form-class'>
            <Card title="User Info" style={{ width: 500, padding: 5 }}>
                <Form
                    name="basic"
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ message: 'Please input your phone number!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Input.TextArea autoSize={true} placeholder='Response after sumbit' value={Object.keys(textResponse).length !== 0 ? JSON.stringify(textResponse, null, 2) : ""} />
            </Card>

        </div>
    </Spin>
}

export default ChatInfo;