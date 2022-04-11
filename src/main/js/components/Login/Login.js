import React, {useRef} from 'react'
import "./Login.css"

const Login = (props) => {
    const userName = useRef();
    const password = useRef();
    const onLoginClick = () => {
        props.loginHandler(userName.current.value, userName.current.value);
    }

    const onEnterPress = (event) => {
        if (event.code === "Enter") {
            onLoginClick();
        }
    }

    return <div className="login-form">
        <input ref={userName} type={"text"} placeholder={"User Name"} onKeyPress={onEnterPress}/>
        <input ref={password} type={"password"} placeholder={"Password"} onKeyPress={onEnterPress}/>
        <button onClick={onLoginClick}>Log In</button>
    </div>
}

export default Login;