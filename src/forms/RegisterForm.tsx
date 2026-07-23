import {Flex, Form} from "antd";
import {TextInput} from "../Components/Inputs/TextInput.tsx";
import {PasswordInput} from "../Components/Inputs/PasswordInput.tsx";
import {Button} from "../Components/Buttons/Button.tsx";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import {useState} from "react";
import {titleMainStyles, titleSecondStyles} from "../widgets/css/loginStyles.ts";
import Title from "antd/es/typography/Title";

export const RegisterForm  = () => {
    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [form] = Form.useForm();

    const onFinishFailed = () => {
        const er = form.getFieldsError();
        er.forEach(error => {
            hasErrors[error.name[0]] = error.errors.length > 0
            setHasErrors({
                ...hasErrors,
            });
        })
    }

    return (
        <Form styles={loginFormStyles} form={form} onFinishFailed={onFinishFailed} style={{height: 520, width: 440}} >
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title styles={titleMainStyles}>Create account</Title>
                    <Title styles={titleSecondStyles}>Shop in the marketplace while traveling</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"}>
                    <Form.Item  name="email" rules={[{required: true, type: "email", message: "Wrong or invalid email address"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="Email" placeholder="Enter your email" styles={hasErrors["email"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                    <Form.Item name="password" style={loginFormItemStyles} rules={[{required: true, message: "Incorrect password"}]} validateTrigger={"onSubmit"}>
                        <PasswordInput prefix="Password" placeholder="Enter your password" styles={hasErrors["password"] ? inputErrorStyles : undefined}/>
                    </Form.Item>

                    <Form.Item name="confirmPassword"
                               style={loginFormItemStyles}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please confirm your password!',
                                   },
                                   ({ getFieldValue }) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('Passwords must match!'));
                                       },
                                   }),
                               ]}
                               validateTrigger={"onSubmit"}>
                        <PasswordInput prefix="Confirm Password" placeholder="Repeat your password" styles={hasErrors["confirmPassword"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                </Flex>
                <Button type="primary" htmlType="submit" style={{width: '100%', height: '52px'}}>
                    Continue
                </Button>
            </Flex>
        </Form>
    )
}