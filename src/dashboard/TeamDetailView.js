import React, {Component} from 'react';
import './AllTeamsView.css';
import './Lists.css'
import './TeamDetailView.css'
import MembersSection from './MembersSection';
import ListsSection from './ListsSection';
import Client from './../Client';
import CreateListModal from "./CreateListModal";

class TeamDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateListModal: false,
      lists: []
    };
    this.fetchTeamLists = this.fetchTeamLists.bind(this);
    this.openCreateListModal = this.openCreateListModal.bind(this);
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.addNewListToTeam = this.addNewListToTeam.bind(this);
  }

  componentDidMount() {
    this.fetchTeamLists()
  }

  openCreateListModal() {
    this.setState({openCreateListModal: true});
  }

  closeCreateListModal() {
    this.setState({openCreateListModal: false})
  }

  addNewListToTeam(list) {
    let lists = this.state.lists;
    lists.push(list);
    this.setState({lists: lists})
  }

  fetchTeamLists() {
    Client.fetchTeamLists(this.props.teamId,
      lists => this.setState({lists: lists}),
      err => alert(`Unable to get lists for team:\n\n${err}`)
    )
  }

  renderModals() {
    if (this.state.openCreateListModal) {
      return <CreateListModal closeModal={this.closeCreateListModal} ownerId={this.props.teamId}
                              addResource={this.addNewListToTeam} name="List Name"/>
    }
  }

  render() {
    return (<div className="team-detail-container">
        {this.renderModals()}
        <div className="team-navigation">
          <MembersSection teamId={this.props.teamId}/>
          <ListsSection teamId={this.props.teamId} openCreateListModal={this.openCreateListModal} lists={this.state.lists}/>
          <div className="section"><div className="leave-team">Leave Team</div></div>
        </div>
        <div className="team-content">
        </div>
      </div>
    )
  }

}

export default TeamDetailView