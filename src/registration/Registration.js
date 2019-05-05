import React, {Component} from 'react';
import './Registration.css';
import RegistrationForm from "./RegistrationForm";
import logo from '../assets/logo-light-with-text.svg';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitRegistration = this.submitRegistration.bind(this);
  }

  // Use this to make network calls
  componentDidMount() {
  }

  submitRegistration(userRegistration) {
    console.log("submitting registration...");
    console.log(userRegistration.email);
  }

  render() {
    return (
      <div className="registration-form">
        <div className="sidebox">
          <div className="logo-container">
            <img src={logo} alt="Team Tasks logo" className="logo-img" />
          </div>
          <div className="welcome">
            <div className="welcome-message">Welcome!</div>
          </div>
        </div>
        <RegistrationForm submit={this.submitRegistration}/>
      </div>
    )
  }
}

export default Registration;
