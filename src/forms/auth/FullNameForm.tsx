import {Flex, Form} from "antd";
import {inputErrorStyles, loginFormItemStyles, loginFormStyle, loginFormStyles} from "./css/loginFormStyles.ts";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../../theme/headerStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {useForm} from "antd/es/form/Form";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {setAuthStatus} from "../../app/slices/authSlice.ts";

export const FullNameForm = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const [hasErrors, setHasErrors] = useState<Record<string, boolean>>({
        firstName: false,
        lastName: false,
    });

    const onFinishFailed = () => {
        const er = form.getFieldsError();
        setHasErrors({...er.hasErrorsOf()})
    }

    const onFinish  = () => {
        dispatch(setAuthStatus({status: "finish"}))
    }

    return (
        <Form styles={loginFormStyles} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Flex vertical gap={4} justify={"space-between"} style={loginFormStyle} align={"center"}>
                {/* Welcome title block*/}
                <Flex vertical align={"center"} gap={6}>
                    <Title style={header1}>Finishing touches</Title>
                    <Title style={header3}>Enter your first and last name</Title>
                </Flex>
                <Flex vertical style={{width: "100%"}} justify={"center"} gap={8}>
                    <Form.Item  name="firstName" rules={[{required: true, message: "First name is required"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="First name" placeholder="Enter your first name" styles={hasErrors["firstName"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                    <Form.Item  name="lastName" rules={[{required: true, message: "Last name is required"}]} style={loginFormItemStyles} validateTrigger={"onSubmit"}>
                        <TextInput prefix="Last name" placeholder="Enter your last name" styles={hasErrors["lastName"] ? inputErrorStyles : undefined}/>
                    </Form.Item>
                </Flex>
                <Button type="primary" htmlType="submit" style={{width: '100%', height: '52px'}}>
                    Create account
                </Button>
            </Flex>
        </Form>
    )
}