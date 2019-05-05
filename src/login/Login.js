import React, {Component} from 'react';
import './Login.css';
import LoginForm from "./LoginForm";
import logo from '../assets/logo-light-with-text.svg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitLogin = this.submitLogin.bind(this);
    }

    // Use this to make network calls
    componentDidMount() {
    }

    submitLogin(userLogin) {
        let host = process.env.REACT_APP_API_HOST;
        console.log(host)
        fetch(host + "/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="login-form">
                <div className="sidebox">
                    <div className="logo-container">
                        <img src={logo} alt="Team Tasks logo" className="logo-img"/>
                    </div>
                    <div className="welcome">
                        <div className="welcome-message">Welcome back!</div>
                    </div>
                </div>
                <LoginForm submit={this.submitLogin}/>
            </div>
        )
    }
}

export default Login;
