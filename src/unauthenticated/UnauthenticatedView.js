import React, {Component} from 'react';
import logo from '../assets/logo-light-with-text.svg';
import './UnauthenticatedView.css';
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const pages = {
  LOGIN: 'login',
  REGISTER: 'register'
};

class UnauthenticatedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: pages.LOGIN
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
  }

  submitLogin(userLogin) {
    let host = process.env.REACT_APP_API_HOST;
    fetch(host + "/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    }).then((res) => res.json())
      .then(user => {
        console.log(`Logging in ${user.firstName} ${user.lastName} was successful!`);
        this.props.setLoggedInUser(user);
      })
      .catch((err) => console.log(err))
  }

  submitRegistration(userRegistration) {
    let host = process.env.REACT_APP_API_HOST;
    fetch(host + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userRegistration)
    }).then(res => res.json())
      .then(user => {
        console.log(`Registering ${user.firstName} ${user.lastName} was successful!`);
        this.props.setLoggedInUser(user);
      })
      .catch(err => alert(`Registration was unsuccessful:\n\n${err}`))
  }

  toggleForm() {
    let targetPage = "";
    if (this.state.currentPage === pages.LOGIN) {
      targetPage = pages.REGISTER;
    } else if (this.state.currentPage === pages.REGISTER) {
      targetPage = pages.LOGIN;
    }
    this.setState({currentPage: targetPage})
  }

  render() {
    let pageComponent = <div></div>;
    let welcomeMessage = "";
    let toggleMessage = "";
    let toggleButtonText = "";
    if (this.state.currentPage === pages.LOGIN) {
      pageComponent = <LoginForm submit={this.submitLogin}/>;
      welcomeMessage = "Welcome back!";
      toggleMessage = "Don't have an account yet?";
      toggleButtonText = "Sign Up";
    } else if (this.state.currentPage === pages.REGISTER) {
      pageComponent = <RegistrationForm submit={this.submitRegistration}/>;
      welcomeMessage = "Welcome!";
      toggleMessage = "Already have an account?";
      toggleButtonText = "Sign In";
    }

    return (
      <div className="unauthenticated-view">
        <div className="sidebox">
          <div className="logo-container">
            <img src={logo} alt="Team Tasks logo" className="logo-img" />
          </div>
          <div className="welcome">
            <div className="welcome-message">{welcomeMessage}</div>
          </div>
          <div className="form-toggle">
            <div className="toggle-message"><span>{toggleMessage}</span></div>
            <input className="toggle-button" type="submit" value={toggleButtonText} onClick={this.toggleForm.bind(this)} />
          </div>
        </div>
        {pageComponent}
      </div>
    )
  }
}

export default UnauthenticatedView;
