import React, {Component} from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": '',
      "password": ''
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
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="field-email">
            <label htmlFor="email" className="field-label">Email Address</label>
            <input id="email" name="email" className="field" type="email" autoComplete="email" value={this.state.email} onChange={e => this.handleChange(e, "email")}/>
          </div>
        </div>
        <div className="row">
          <div className="field-password">
            <label htmlFor="password" className="field-label">Password</label>
            <input id="password" name="password" className="field" type="password" autoComplete="current-password" value={this.state.password} onChange={e => this.handleChange(e, "password")}/>
          </div>
        </div>
        <div className="button-row">
          <input className="submit-button" type="submit" value="Sign In" />
        </div>
      </form>
    )
  }

}

export default LoginForm;