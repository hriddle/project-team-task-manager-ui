import React, {Component} from 'react';
import list from "../../assets/list.svg";
import PersonalListsSection from "./PersonalListsSection";
import Client from '../../Client'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Client.fetchTeamsByUser(this.props.userId, teams => this.props.setTeams(teams));
  }

  render() {
    let teams = [];
    if (this.props.teams.length > 0) {
      teams = this.props.teams.map(team =>
          <div className="list-element" key={team.id} onClick={() => this.props.openTeamDetail(team.id)}>{team.name}</div>);
    }

    return (
      <div className="navbar">
        <div className="divider"/>
        <PersonalListsSection userId={this.props.userId}
                              lists={this.props.personalLists}
                              openCreateListModal={this.props.openCreateListModal}
                              setLists={this.props.setPersonalLists}
                              openList={this.props.openPersonalList}/>
        <div className="divider"/>
        <div className="list">
          <div className="row">
            <div className="list-title">Teams</div><img src={list} alt="Search" className="search-img" onClick={this.props.toggleTeams}/>
          </div>
          {teams}
          <div className="new-list" onClick={this.props.openCreateTeamModal}>NEW TEAM</div>
        </div>
      </div>
    )
  }
}

export default NavBar