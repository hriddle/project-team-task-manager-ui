import React, {Component} from 'react';
import '../allteams/AllTeamsView.css';
import '../tasklist/Lists.css'
import './TeamDetailView.css'
import MembersSection from './MembersSection';
import ListsSection from './ListsSection';
import Client from '../../Client';
import CreateModal from "../CreateModal";
import TaskList from "../tasklist/TaskList";

class TeamDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateListModal: false,
      members: [],
      lists: [],
      selectedList: null
    };
    this.fetchTeamLists = this.fetchTeamLists.bind(this);
    this.openCreateListModal = this.openCreateListModal.bind(this);
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.addNewListToTeam = this.addNewListToTeam.bind(this);
    this.openList = this.openList.bind(this);
  }

  componentDidMount() {
    this.fetchTeamLists();
    this.fetchMembers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.teamId !== this.props.teamId) {
      this.fetchTeamLists();
      this.fetchMembers();
    }
  }

  fetchMembers(){
    Client.fetchMembersInTeam(this.props.teamId,
      members => this.setState({members: members})
    )
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
      lists => this.setState({lists: lists, selectedList: null})
    )
  }

  renderModals() {
    if (this.state.openCreateListModal) {
      return <CreateModal closeModal={this.closeCreateListModal} owner={{id: this.props.teamId, type: 'team'}}
                          addList={this.addNewListToTeam} type="list"/>
    }
  }

  openList(listId) {
    let list = this.state.lists.find(list => listId === list.id);
    this.setState({selectedList: list})
  }

  render() {
    let content = '';
    if (this.state.selectedList !== null) {
      content = <TaskList userId={this.props.userId} list={this.state.selectedList} members={this.state.members}/>
    }
    return (<div className="team-detail-container">
        {this.renderModals()}
        <div className="team-navigation">
          <MembersSection teamId={this.props.teamId} members={this.state.members}/>
          <ListsSection teamId={this.props.teamId} openCreateListModal={this.openCreateListModal}
                        lists={this.state.lists} openList={this.openList}/>
          <div className="section"><div className="leave-team">Leave Team</div></div>
        </div>
        <div className="team-content">{content}</div>
      </div>
    )
  }

}

export default TeamDetailView