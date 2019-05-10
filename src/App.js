import React, {Component} from 'react';
import UnauthenticatedView from "./unauthenticated/UnauthenticatedView";
import DashboardView from "./dashboard/DashboardView";

const pages = {
  UNAUTHENTICATED: 'unauthenticated',
  DASHBOARD: 'dashboard'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      currentPage: pages.UNAUTHENTICATED
    };

    this.setLoggedInUser = this.setLoggedInUser.bind(this);
  }

  setLoggedInUser(user) {
    this.setState({
      loggedInUser: user,
      currentPage: pages.DASHBOARD
    });
  }

  // Use this to make network calls
  componentDidMount() {
    console.log("Application loading...");
    console.log(`API Host: ${process.env.REACT_APP_API_HOST}`);
  }

  render() {
    let pageComponent = <div></div>;
    if (this.state.currentPage === pages.UNAUTHENTICATED) {
      pageComponent = <UnauthenticatedView setLoggedInUser={this.setLoggedInUser}/>;
    }
    if(this.state.currentPage === pages.DASHBOARD){
      pageComponent = <DashboardView user={this.state.loggedInUser}/>;
    }
    return (
      <div id="page-container">
        {pageComponent}
      </div>
    )
  }
}

export default App;
