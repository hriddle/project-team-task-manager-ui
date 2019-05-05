import React, {Component} from 'react';
import Registration from "./registration/Registration";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Use this to make network calls
  componentDidMount() {
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
