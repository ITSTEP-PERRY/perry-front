import {useForm} from "antd/es/form/Form";
import {Flex, Form} from "antd";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../../theme/headerStyles.ts";
import {Button} from "../../Components/Buttons/Button.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {useState} from "react";
import {setAuthStatus} from "../../app/slices/authSlice.ts";
import {PasswordInput} from "../../Components/Inputs/PasswordInput.tsx";

export const ResetPasswordForm = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        password: false,
        repeatPassword: false,
    });
    const onFinish = () => {
        dispatch(setAuthStatus({status: "signIn"}));
    }
    const onFinishFailed = () => {
        const er = form.getFieldsError();
        setHasErrors({...er.hasErrorsOf()})
    }

    return (
        <Form styles={loginFormStyles} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title style={header1}>Reset Password</Title>
                    <Title style={header3}>Set a new password for your account</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"} gap={8}>
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