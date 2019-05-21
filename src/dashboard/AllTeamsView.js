import React, {Component} from 'react';
import './AllTeamsView.css';

class AllTeamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    this.fetchAllTeams()
  }

  fetchAllTeams() {
    fetch(`${process.env.REACT_APP_API_HOST}/teams`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
      .then(lists => this.setState({teams: lists}))
      .catch(err => alert(`Fetching teams was unsuccessful:\n\n${err}`))
  }

  render() {
    let teams = [];
    if (this.state.teams.length > 0) {
      teams = this.state.teams.map(team =>
        <li className="team" key={team.id}>
          <div className="team-name" >{team.name}</div>
          <div className="join">JOIN</div>
          <div className="team-divider"/>
        </li>
      );
    }
    return (
      <div className="teams">
        <div className="team-container">
          <div className="team-divider"/>
          <ul>
            {teams}
          </ul>
        </div>
      </div>)
  }
}

export default AllTeamsView