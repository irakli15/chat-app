import React, {useRef} from 'react'
import classes from "./Login.module.css"
import Button from "../General/Button/Button";

const Login = (props) => {
	const userName = useRef();
	const password = useRef();
	const onLoginClick = (event) => {
		event.preventDefault();
		props.loginHandler(userName.current.value, userName.current.value);
	}

	const onEnterPress = (event) => {
		if (event.code === "Enter") {
			onLoginClick();
		}
	}

	return <div className={classes.login}>
		<h1>ChatApp</h1>
		<form className={classes['login-form']}>
			<input ref={userName} type={"text"} placeholder={"User Name"} onKeyPress={onEnterPress}/>
			<input ref={password} type={"password"} placeholder={"Password"} onKeyPress={onEnterPress}/>
			<Button type="submit" onClick={onLoginClick}>Log In</Button>
		</form>
	</div>

}

export default Login;