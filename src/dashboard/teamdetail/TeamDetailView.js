import React, {Component} from 'react';
import '../allteams/AllTeamsView.css';
import '../tasklist/Lists.css'
import './TeamDetailView.css'
import MembersSection from './MembersSection';
import ListsSection from './ListsSection';
import Client from '../../Client';
import CreateModal from "../CreateModal";

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
      lists => this.setState({lists: lists})
    )
  }

  renderModals() {
    if (this.state.openCreateListModal) {
      return <CreateModal closeModal={this.closeCreateListModal} owner={{id: this.props.teamId, type: 'team'}}
                          addList={this.addNewListToTeam} type="list"/>
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