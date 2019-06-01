import React, {Component} from 'react';
import './AllTeamsView.css';
import Client from '../../Client'

class AllTeamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    Client.fetchAllTeams(teams => this.setState({teams: teams}));
  }

  joinTeam(teamID, userID) {
    Client.addMemberToTeam(teamID, userID,
      team => {
        this.props.addResource(team);
        document.getElementById(teamID).className = "member-of-team";
        document.getElementById(teamID).textContent = "MEMBER";
      }
    );
  }

  render() {
    let teams = [];
    if (this.state.teams.length > 0) {
      teams = this.state.teams.map(team =>
        <li className="team" key={team.id}>
          <div className="team-name">{team.name}</div>
          {team.members.filter(member => member.id === this.props.userId).length > 0 ? (
            <div id={team.id} className="member-of-team">MEMBER</div>
          ) : (
            <div id={team.id} className="join" onClick={() => this.joinTeam(team.id, this.props.userId)}>JOIN</div>
          )}
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