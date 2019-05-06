import React, {Component} from 'react';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "firstName": '',
      "lastName": '',
      "email": '',
      "password": '',
      "passwordConfirmation": ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, fieldName) {
    this.setState({
      [fieldName]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <form className="registration-form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="field-first-name">
            <label htmlFor="first-name" className="field-label">First Name</label>
            <input id="first-name" name="firstName" className="field" type="text" value={this.state.firstName} onChange={e => this.handleChange(e, "firstName")}/>
          </div>
          <div className="field-last-name">
            <label htmlFor="last-name" className="field-label">Last Name</label>
            <input id="last-name" name="lastName" className="field" type="text" value={this.state.lastName} onChange={e => this.handleChange(e, "lastName")}/>
          </div>
        </div>
        <div className="row">
          <div className="field-email">
            <label htmlFor="email" className="field-label">Email Address</label>
            <input id="email" name="email" className="field" type="email" autoComplete="email" value={this.state.email} onChange={e => this.handleChange(e, "email")}/>
          </div>
        </div>
        <div className="row">
          <div className="field-password">
            <label htmlFor="password" className="field-label">Password</label>
            <input id="password" name="password" className="field" type="password" autoComplete="new-password" value={this.state.password} onChange={e => this.handleChange(e, "password")}/>
          </div>
          <div className="field-password-confirmation">
            <label htmlFor="password-confirmation" className="field-label">Confirm Password</label>
            <input id="password-confirmation" name="password-confirmation" className="field" type="password" autoComplete="new-password" value={this.state.passwordConfirmation} onChange={e => this.handleChange(e, "passwordConfirmation")}/>
          </div>
        </div>
        <div className="button-row">
          <input className="submit-button" type="submit" value="Sign Up" />
        </div>
      </form>
    )
  }

}

export default RegistrationForm;