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
      openCreateTeamModal: false,
      personalLists: [],
      teams: []
    };
    this.openCreatePersonalListModal = this.openCreatePersonalListModal.bind(this);
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.setPersonalLists = this.setPersonalLists.bind(this);
    this.addNewListToPersonalLists = this.addNewListToPersonalLists.bind(this);

    this.openCreateTeamModal = this.openCreateTeamModal.bind(this);
    this.closeCreateTeamModal = this.closeCreateTeamModal.bind(this);
    this.setTeams = this.setTeams.bind(this);
    this.addNewTeamToTeamList = this.addNewTeamToTeamList.bind(this);
  }

  renderModals() {
    if (this.state.openCreatePersonalListModal) {
      return <CreateListModal closeModal={this.closeCreateListModal} ownerId={this.props.user.userId}
                              addResource={this.addNewListToPersonalLists}
                              name="List Name"/>
    }
    if (this.state.openCreateTeamModal) {
      return <CreateListModal closeModal={this.closeCreateTeamModal} ownerId={this.props.user.userId}
                              addResource={this.addNewTeamToTeamList}
                              name="Team Name"/>
    }
  }

  openCreatePersonalListModal() {
    this.setState({openCreatePersonalListModal: true});
  }

  closeCreateListModal() {
    this.setState({openCreatePersonalListModal: false});
  }

  openCreateTeamModal() {
    this.setState({openCreateTeamModal: true});
  }

  closeCreateTeamModal() {
    this.setState({openCreateTeamModal: false});
  }

  addNewListToPersonalLists(list) {
    let lists = this.state.personalLists;
    lists.push(list);
    this.setState({personalLists: lists})
  }

  addNewTeamToTeamList(list) {
    let lists = this.state.teams;
    lists.push(list);
    this.setState({teams: lists})
  }

  setPersonalLists(lists) {
    this.setState({personalLists: lists})
  }

  setTeams(teams) {
    this.setState({teams: teams})
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
                teams={this.state.teams}
                setTeams={this.setTeams}
                openCreateTeamModal={this.openCreateTeamModal}
        />
        <div className="main-content">
          {this.renderModals()}
        </div>
      </div>
    )
  }
}

export default Dashboard