import {Button} from "../Components/Buttons/Button.tsx";
import {Flex, Modal, Space} from "antd";
import {useState} from "react";
import SignupImage from "../assets/images/SiginSignup.png"
import {loginFormStyles, modalStyles} from "./css/loginStyles.ts";
import {LoginForm} from "../forms/auth/LoginForm.tsx";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import {RegisterForm} from "../forms/auth/RegisterForm.tsx";
import {colors} from "../theme/colors.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthStatus, setAuthStatus, switchToPrevAuthStatus} from "../app/slices/authSlice.ts";
import {ArrowLeft} from "../Components/Icon/ArrowLeft.tsx";
import {text2} from "../theme/textStyles.ts";
import {OtpForm} from "../forms/auth/OtpForm.tsx";
import {FullNameForm} from "../forms/auth/FullNameForm.tsx";
import Title from "antd/es/typography/Title";
import {header1, header3} from "../theme/headerStyles.ts";
import {ForgotPasswordForm} from "../forms/auth/ForgotPasswordForm.tsx";
import {ResetPasswordForm} from "../forms/auth/ResetPasswordForm.tsx";


export const SignInSignUp = () => {
    const [open, setOpen] = useState(false);
    const windowState = useSelector(selectAuthStatus);
    const dispatch = useDispatch();
    const toggleModal = () => setOpen(!open);
    return (
        <>
            <Button type={"primary"} onClick={toggleModal}>Login</Button>
            <Modal open={open} closeIcon={false} footer={null} className="module" width={1280} styles={modalStyles} >
                <Flex gap={4}>
                    {windowState === "signIn" ? (
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                    <LoginForm />
                                    <Text style={{fontSize: "16px"}}>Don't have an account? <Link onClick={() => dispatch(setAuthStatus({status: "signUp"}))}>Sign Up</Link></Text>
                                </Flex>)
                        : windowState === "signUp" ? (
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"end"} gap={16}>
                                    <RegisterForm />
                                    <Text style={{fontSize: "16px"}}>Have an account? <Link onClick={() => dispatch(setAuthStatus({status: "signIn"}))}>Sign In</Link></Text>
                                    <Text style={{color: colors.inputBorder, fontSize: "16px"}}>By clicking "Continue", you agree with <Link>PERRY Terms and Conditions</Link></Text>
                                </Flex>
                        )
                        : windowState === "code" ?
                                <Flex vertical  style={loginFormStyles}>
                                    <Flex justify={"start"}>
                                        <Button type={"tertiary"} onClick={() => dispatch(switchToPrevAuthStatus())}>
                                            <Flex align={"center"} gap={6} justify={"end"}>
                                                <ArrowLeft color={colors.secondary} size={31} width={1.5}/>
                                                <Text style={text2}>Back</Text>
                                            </Flex>
                                        </Button>
                                    </Flex>
                                    <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                        <OtpForm />
                                    </Flex>
                                </Flex>
                        : windowState === "fullName" ?
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                    <FullNameForm />
                                </Flex>
                        : windowState === "finish" ?
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"space-evenly"} gap={16}>
                                    <Space vertical align="center">
                                        <Title style={header1}>Congratulations!</Title>
                                        <Title style={header3}>The registration was completed</Title>
                                    </Space>
                                    <Button type={"primary"}
                                            onClick={() => setOpen(false)}
                                            style={{width: '440px', height: '52px'}}
                                    >Let's start shopping</Button>
                                </Flex>
                        : windowState === "forgotPassword" ?
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                    <ForgotPasswordForm />
                                </Flex>
                        : windowState === "resetPassword" ?
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                    <ResetPasswordForm />
                                </Flex>
                        : <></>
                    }
                    <div>
                        <img src={SignupImage} alt="Sign up" />
                    </div>
                </Flex>
            </Modal>
        </>
    )
}