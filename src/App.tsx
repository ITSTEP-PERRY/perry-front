import {Flex} from "antd";
import './App.css'
import {Button} from "./Components/Buttons/Button.tsx";
import {AiFillAccountBook} from "react-icons/ai";
import {BellIcon} from "./Components/Icon/BellIcon.tsx";
import {UserIcon} from "./Components/Icon/UserIcon.tsx";

const App = () => (
    <div className="App">
        <Flex vertical gap={4} style={{width:'20%', paddingLeft:'100px'}} >
        <Button type="primary" disabled>Primary</Button>
        <Button type="secondary" icon={<BellIcon />}>Default</Button>
        <Button type="tertiary" icon={<AiFillAccountBook/>}/>
        <Button type="destructive" icon={<UserIcon  />}/>
        </Flex>
    </div>
);

export default App
