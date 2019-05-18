import React, {Component} from 'react';
import list from "../assets/list.svg";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchPersonalLists(this.props.userId);
    this.fetchTeams(this.props.userId);
  }

  fetchPersonalLists(userId) {
    fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/lists`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
      .then(lists => this.props.setPersonalLists(lists))
      .catch(err => alert(`Fetching personal lists was unsuccessful:\n\n${err}`))
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
    let personalLists = [];
    if (this.props.personalLists.length > 0) {
      personalLists = this.props.personalLists.map(list =>
        <div className="list-element" key={list.id}>{list.name}</div>);
    }

    let teams = [];
    if (this.props.teams.length > 0) {
      teams = this.props.teams.map(team =>
          <div className="list-element" key={team.id}>{team.name}</div>);
    }

    return (
      <div className="sidebox">
        <div className="divider"/>
        <div className="list">
          <div className="list-title">Personal Lists</div>
          {personalLists}
          <div className="new-list" onClick={this.props.openCreateListModal}>NEW LIST</div>
        </div>
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