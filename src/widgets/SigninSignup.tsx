import {Button} from "../Components/Buttons/Button.tsx";
import {Flex, Modal} from "antd";
import {useState} from "react";
import SignupImage from "../assets/images/SiginSignup.png"
import {loginFormStyles, modalStyles} from "./css/loginStyles.ts";
import {LoginForm} from "../forms/LoginForm.tsx";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import {RegisterForm} from "../forms/RegisterForm.tsx";
import {colors} from "../theme/colors.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthStatus, setAuthStatus, setPrevAuthStatus} from "../app/slices/authSlice.ts";
import {ArrowLeft} from "../Components/Icon/ArrowLeft.tsx";
import {text2} from "../theme/textStyles.ts";
import {OtpForm} from "../forms/OtpForm.tsx";


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
                                        <Button type={"tertiary"} onClick={() => dispatch(setPrevAuthStatus())}>
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
                        : <>test</>
                    }
                    <div>
                        <img src={SignupImage} alt="Sign up" />
                    </div>
                </Flex>
            </Modal>
        </>
    )
}