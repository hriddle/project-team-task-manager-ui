import React, {Component} from 'react';
import './DashboardView.css';
import logo from "../assets/logo-light-with-text.svg";
import CreateListModal from "./CreateListModal";

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreatePersonalListModal: false,
      personalLists: []
    };
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.refreshPersonalLists = this.refreshPersonalLists.bind(this);
    this.fetchPersonalLists = this.fetchPersonalLists.bind(this);
  }

  createList() {
    this.setState({openCreatePersonalListModal: true});
  }

  renderModals() {
    if (this.state.openCreatePersonalListModal) {
      return <CreateListModal closeModal={this.closeCreateListModal} ownerId={this.props.user.userId} refreshLists={this.refreshPersonalLists}/>
    }
  }

  closeCreateListModal() {
    this.setState({openCreatePersonalListModal: false});
  }

  refreshPersonalLists() {
    this.fetchPersonalLists(this.props.user.userId);
  }

  componentDidMount() {
    this.fetchPersonalLists(this.props.user.userId);
  }

  fetchPersonalLists(userId) {
    fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/lists`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
      .then(lists => this.setState({personalLists: lists}))
      .catch(err => alert(`Fetching personal lists was unsuccessful:\n\n${err}`))
  }

  render() {
    let personalLists = [];
    if (this.state.personalLists.length > 0) {
      personalLists = this.state.personalLists.map(list =>
        <div className="list-element" key={list.id}>{list.name}</div>);
    }

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

        <div className="sidebox">
          <div className="divider"/>
          <div className="list">
            <div className="list-title">Personal Lists</div>
            {personalLists}
            <div className="new-list" onClick={this.createList.bind(this)}>NEW LIST</div>
          </div>
          <div className="divider"/>
          <div className="list">
            <div className="list-title">Teams</div>
            {/*<div className="list-element">Stark Industries</div>*/}
            {/*<div className="list-element">S.H.I.E.L.D</div>*/}
            {/*<div className="list-element">The Avengers</div>*/}
            {/*<div className="list-element">Guardians of the Galaxy</div>*/}
            <div className="new-list">NEW LIST</div>
          </div>
        </div>
        <div className="main-content">
          {this.renderModals()}
        </div>
      </div>
    )
  }
}

export default DashboardView