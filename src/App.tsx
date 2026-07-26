import {Flex} from "antd";
import './App.css'
import {SignInSignUp} from "./widgets/SigninSignup.tsx";

const App = () => (
    <div className="App">
        <Flex vertical gap={4} style={{width:'20%', paddingLeft:'100px'}} >
            <SignInSignUp />
        </Flex>
    </div>
);

export default App
