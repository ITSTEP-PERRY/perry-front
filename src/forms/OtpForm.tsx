import {Form, Input} from "antd";

export const OtpForm = () => {
    return (
        <Form>
              <Form.Item>
                  <Input.OTP />
              </Form.Item>
        </Form>
    )
}