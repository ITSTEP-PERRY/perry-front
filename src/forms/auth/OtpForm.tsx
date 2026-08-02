import {Flex, Form, Input, Space, Statistic} from "antd";
import {loginFormStyle, optStyles, otpFormStyles} from "./css/loginFormStyles.ts";
import Title from "antd/es/typography/Title";
import {Button} from "../../Components/Buttons/Button.tsx";
import Text from "antd/es/typography/Text";
import {header1, header3} from "../../theme/headerStyles.ts";
import {text2} from "../../theme/textStyles.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {switchToNextAuthStatus} from "../../app/slices/authSlice.ts";
import {useState} from "react";
import {useForm} from "antd/es/form/Form";

const {Timer} = Statistic

export type OtpFormProps = {

}


const deadline = () => Date.now() + 1000 * Number(import.meta.env.VITE_OTP_COUNTDOWN)

export const OtpForm = () => {
    const [form] = useForm();
    const [codeStatus, setCodeStatus] = useState<{timer: boolean, resend: boolean}>({
        timer: true,
        resend: false
    })
    const dispatch = useAppDispatch();


    const onFinish = () => {
        dispatch(switchToNextAuthStatus())
    }

    const onTimerFinish = () => {
        setCodeStatus({timer: false, resend: true})
        form.setFields([{name: "code", errors: ["Incorrect code, try again."]}])
    }

    return (
        <Form styles={otpFormStyles} onFinish={onFinish}  form={form}>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle}  align={"center"} >
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={0}>
                    <Title  style={header1}>Send code</Title>
                    <Title  style={header3}>Enter the code to confirm your email</Title>
                </Flex>
                <Flex vertical align={"center"} gap={8}>
                    <Form.Item name={"code"}>
                            <Input.OTP styles={optStyles}/>
                    </Form.Item>
                    { codeStatus.resend ?
                        <Button type={"tertiary"} style={text2}>Resend code</Button>
                        : codeStatus.timer ?
                            <Space align={"baseline"}>
                                <Text style={text2}>Resend code</Text>
                                <Timer styles={{value: {...text2}}}
                                       onFinish={onTimerFinish}
                                       type="countdown"
                                       value={deadline()}
                                       format={"mm:ss"}/>
                            </Space>
                            : <Text style={text2}>Send code</Text>}
                </Flex>

                <Button type="primary" htmlType="submit"  onClick={() => {setCodeStatus({timer: !codeStatus.timer, resend: false})}} style={{width: '100%', height: '52px'}}>
                    Continue
                </Button>
            </Flex>
        </Form>
    )
}