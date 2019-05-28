import React, {Component} from 'react';
import './AllTeamsView.css';
import './Lists.css'
import './TeamDetailView.css'
import MembersSection from "./MembersSection";

class TeamDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (<div className="team-container">
        <div className="column-left">
          <MembersSection teamId={this.props.teamId}/>
          <div className="leave-team">
            Leave Team
          </div>
        </div>
        <div className="column-right">
        </div>
      </div>
    )
  }

}

export default TeamDetailView