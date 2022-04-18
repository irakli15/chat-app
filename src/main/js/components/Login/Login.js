import React, {useRef} from 'react'
import classes from "./Login.module.css"
import Button from "../General/Button/Button";

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

	return <div className={classes.login}>
		<h1>ChatApp</h1>
		<input ref={userName} type={"text"} placeholder={"User Name"} onKeyPress={onEnterPress}/>
		<input ref={password} type={"password"} placeholder={"Password"} onKeyPress={onEnterPress}/>
		<Button onClick={onLoginClick}>Log In</Button>
	</div>
}

export default Login;