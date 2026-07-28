import {Checkbox, Flex, Form} from "antd";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {PasswordInput} from "../../Components/Inputs/PasswordInput.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import {useState} from "react";
import {colors} from "../../theme/colors.ts";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../../theme/headerStyles.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {setAuthStatus} from "../../app/slices/authSlice.ts";
import Link from "antd/es/typography/Link";
import {text2, text3} from "../../theme/textStyles.ts";

export const LoginForm = () => {
    const [form] = Form.useForm();
    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        email: false,
        password: false,
        remember: false,
    });
    const dispatch = useAppDispatch();
    const onFinishFailed = () => {
        const er = form.getFieldsError();
        setHasErrors({...er.hasErrorsOf()})
    }

    const onForgotPasswordClick = () => {
        dispatch(setAuthStatus({status: "forgotPassword"}));
    }

    return (
        <Form styles={loginFormStyles} form={form} onFinishFailed={onFinishFailed}>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title style={header1}>Welcome back</Title>
                    <Title style={header3}>Login into your account</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"} gap={8}>
                    <Form.Item  name="email" rules={[{required: true, type: "email", message: "Wrong or invalid email address"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="Email" placeholder="Enter your email" styles={hasErrors["email"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                    <Form.Item name="password" style={loginFormItemStyles} rules={[{required: true, message: "Incorrect password"}]} validateTrigger={"onSubmit"}>
                        <PasswordInput prefix="Password" placeholder="Enter your password" styles={hasErrors["password"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" style={loginFormItemStyles}>
                        <Flex justify="space-between" >
                            <Checkbox style={text3}>Stay signed in</Checkbox>
                            <Link style={text3} onClick={onForgotPasswordClick}>Forgot password?</Link>
                        </Flex>
                    </Form.Item>
                </Flex>
                <Button type="primary" htmlType="submit" style={{width: '100%', height: '52px'}}>
                    Log in
                </Button>
            </Flex>
        </Form>
    )
}