import React, { useRef } from "react";
import "./Login.css";

const Login = (props) => {
	const userNameRef = useRef();
	const passwordRef = useRef();
	const loginClickHandler = () => {
		if (userNameRef.current.value) {
			props.loginHandler(userNameRef.current.value);
		}
	};

	return (
		<div className="login-style">
			<input
				className="login-input"
				type={"text"}
				placeholder="User Name"
				ref={userNameRef}
			/>
			<input
				className="login-input"
				type={"password"}
				placeholder="Password"
				ref={passwordRef}
			/>
			<button className="login-input" onClick={loginClickHandler}>
				Log In
			</button>
		</div>
	);
};

export default Login;
