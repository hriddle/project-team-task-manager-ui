import React, {Component} from 'react';
import list from "../assets/list.svg";
import PersonalListsSection from "./PersonalListsSection";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchTeams(this.props.userId);
  }

  fetchTeams(userId){
    fetch(`${process.env.REACT_APP_API_HOST}/teams?userId=${userId}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
        .then(lists => this.props.setTeams(lists))
        .catch(err => alert(`Fetching teams was unsuccessful:\n\n${err}`))
  }

  render() {
    let teams = [];
    if (this.props.teams.length > 0) {
      teams = this.props.teams.map(team =>
          <div className="list-element" key={team.id}>{team.name}</div>);
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