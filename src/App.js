import React, {Component} from 'react';
import Registration from "./registration/Registration";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  // Use this to make network calls
  componentDidMount() {
    console.log("Application loading...");
    console.log(`"API Host: ${process.env.REACT_APP_API_HOST}`);
  }

  render() {
    return (
      <div id="page-container">
        <Registration/>
      </div>
    )
  }
}

export default App;
