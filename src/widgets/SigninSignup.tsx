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

export type SignState = "signin" | "signup" | "forgot" | "code" | "name" | "finish";

export const SigninSignup = () => {
    const [open, setOpen] = useState(false);
    const [windowState, setWindowState] = useState<SignState>("signin")
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button type={"primary"} onClick={toggleModal}>Login</Button>
            <Modal open={open} closeIcon={false} footer={null} className="module" width={1280} styles={modalStyles} >
                <Flex gap={4}>
                    {windowState === "signin" ? (
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"center"} gap={16}>
                                    <LoginForm />
                                    <Text>Don't have an account? <Link onClick={() => setWindowState("signup")}>Sign Up</Link></Text>
                                </Flex>)
                        : windowState === "signup" ? (
                                <Flex vertical  style={loginFormStyles} align={"center"} justify={"end"} gap={16}>
                                    <RegisterForm />
                                    <Text>Have an account? <Link onClick={() => setWindowState("signin")}>Sign Up</Link></Text>
                                    <Text style={{color: colors.inputBorder, }}>By clicking "Continue", you agree with <Link>PERRY Terms and Conditions</Link></Text>
                                </Flex>
                        )
                        :<></>
                    }
                    <div>
                        <img src={SignupImage} alt="Sign up" />
                    </div>
                </Flex>
            </Modal>
        </>
    )
}