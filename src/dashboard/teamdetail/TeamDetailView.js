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
      openCreateRetroModal: false,
      members: [],
      lists: [],
      retrospectives: [],
      selectedList: null
    };
    this.fetchTeamLists = this.fetchTeamLists.bind(this);
    this.openCreateListModal = this.openCreateListModal.bind(this);
    this.closeCreateListModal = this.closeCreateListModal.bind(this);
    this.addNewListToTeam = this.addNewListToTeam.bind(this);
    this.addNewRetroToTeam = this.addNewRetroToTeam.bind(this);
    this.openCreateRetroModal = this.openCreateRetroModal.bind(this);
    this.closeCreateRetroModal = this.closeCreateRetroModal.bind(this);
    this.openList = this.openList.bind(this);
    this.openRetrospective = this.openRetrospective.bind(this);
  }

  componentDidMount() {
    this.fetchTeamLists();
    this.fetchMembers();
    this.fetchTeamRetrospectives()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.teamId !== this.props.teamId) {
      this.fetchTeamLists();
      this.fetchMembers();
      this.fetchTeamRetrospectives();
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

  openCreateRetroModal() {
    this.setState({openCreateRetroModal: true});
  }

  closeCreateRetroModal() {
    this.setState({openCreateRetroModal: false});
  }

  closeCreateListModal() {
    this.setState({openCreateListModal: false})
  }

  addNewListToTeam(list) {
    let lists = this.state.lists;
    lists.push(list);
    this.setState({lists: lists})
  }

  addNewRetroToTeam(list) {
    let retros = this.state.retrospectives;
    retros.push(list);
    this.setState({retrospectives: retros})
  }

  fetchTeamLists() {
    Client.fetchTeamLists(this.props.teamId,
      lists => this.setState({lists: lists, selectedList: null})
    )
  }

  fetchTeamRetrospectives(){
    Client.fetchTeamRetrospectives(this.props.teamId,
      retros => this.setState({retrospectives: retros, selectedList: null})
    )
  }

  renderModals() {
    if (this.state.openCreateListModal) {
      return <CreateModal closeModal={this.closeCreateListModal} owner={{id: this.props.teamId, type: 'team'}}
                          addList={this.addNewListToTeam} type="list"/>
    }
    if (this.state.openCreateRetroModal) {
      return <CreateModal closeModal={this.closeCreateRetroModal} owner={{id: this.props.teamId, type: 'team'}}
                          addRetro={this.addNewRetroToTeam} type="retrospective"/>
    }
  }

  openList(listId) {
    let list = this.state.lists.find(list => listId === list.id);
    this.setState({selectedList: list})
  }

  openRetrospective(retroId) {
    let retro = this.state.retrospectives.find(retro => retroId === retro.id);
    this.setState({selectedList: retro})
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
                        lists={this.state.lists} openList={this.openList} type="list"/>

          <ListsSection teamId={this.props.teamId} openCreateListModal={this.openCreateRetroModal}
                        lists={this.state.retrospectives} openList={this.openRetrospective} type="retrospective"/>
          <div className="section"><div className="leave-team">Leave Team</div></div>
        </div>
        <div className="team-content">{content}</div>
      </div>
    )
  }

}

export default TeamDetailView