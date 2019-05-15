import React, {Component} from 'react';
import './Dashboard.css';
import logo from "../assets/logo-light-with-text.svg";
import CreateListModal from "./CreateListModal";
import NavBar from "./NavBar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreatePersonalListModal: false,
      personalLists: []
    };
    this.openCreatePersonalListModal = this.openCreatePersonalListModal.bind(this);
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.setPersonalLists = this.setPersonalLists.bind(this);
    this.addNewListToPersonalLists = this.addNewListToPersonalLists.bind(this);
  }

  renderModals() {
    if (this.state.openCreatePersonalListModal) {
      return <CreateListModal closeModal={this.closeCreateListModal} ownerId={this.props.user.userId}
                              addNewList={this.addNewListToPersonalLists}/>
    }
  }

  openCreatePersonalListModal() {
    this.setState({openCreatePersonalListModal: true});
  }

  closeCreateListModal() {
    this.setState({openCreatePersonalListModal: false});
  }

  addNewListToPersonalLists(list) {
    let lists = this.state.personalLists;
    lists.push(list);
    this.setState({personalLists: lists})
  }

  setPersonalLists(lists) {
    this.setState({personalLists: lists})
  }

  render() {
    return (
      <div className="dashboardView">
        <div className='header-row'>
          <div className="header-title">
            <div className="header-text">DASHBOARD</div>
            <div className="name-container">
              <div className="header-user-name">{this.props.user.firstName}<br/> {this.props.user.lastName}</div>
              <div className="circle-thing">
                <div
                  className="header-initials">{this.props.user.firstName.charAt(0)}{this.props.user.lastName.charAt(0)}</div>
              </div>
            </div>
          </div>
          <div className="logo-container">
            <img src={logo} alt="Team Tasks logo" className="logo-img"/>
          </div>
        </div>
        <NavBar openCreateListModal={this.openCreatePersonalListModal}
                userId={this.props.user.userId}
                personalLists={this.state.personalLists}
                setPersonalLists={this.setPersonalLists}
        />
        <div className="main-content">
          {this.renderModals()}
        </div>
      </div>
    )
  }
}

export default Dashboard