import {useForm} from "antd/es/form/Form";
import {Flex, Form} from "antd";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../../theme/headerStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {useState} from "react";
import {setAuthStatus} from "../../app/slices/authSlice.ts";

export const ForgotPasswordForm = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        email: false
    });
    const onFinish = () => {
        dispatch(setAuthStatus({status: "code", next: "resetPassword"}));
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
                    <Title style={header1}>Forgot Password</Title>
                    <Title style={header3}>Enter your email to reset your password</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"} gap={8}>
                    <Form.Item  name="email" rules={[{required: true, type: "email",  message: "Wrong or invalid email address"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="Email" placeholder="Enter your email" styles={hasErrors["email"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                </Flex>
                <Button type="primary" htmlType="submit" style={{width: '100%', height: '52px'}}>
                    Continue
                </Button>
            </Flex>
        </Form>
    )
}