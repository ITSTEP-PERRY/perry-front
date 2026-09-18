import {Flex, Form} from "antd";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {PasswordInput} from "../../Components/Inputs/PasswordInput.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import {useState} from "react";
import Title from "antd/es/typography/Title";
import {useAppDispatch} from "../../app/hooks.ts";
import {setAuthStatus} from "../../app/slices/authSlice.ts";
import {header1, header3} from "../../theme/headerStyles.ts";

export const RegisterForm  = () => {
    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinishFailed = () => {
        const er = form.getFieldsError();
        setHasErrors({...er.hasErrorsOf()})
    }

    const onFinish = () => {
        dispatch(setAuthStatus({status: "code", next: "fullName"}));
    }

    return (
        <Form styles={loginFormStyles} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} preserve>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title style={header1}>Create account</Title>
                    <Title style={header3}>Shop in the marketplace while traveling</Title>
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