import React, {Component} from 'react';
import './AllTeamsView.css';
import './Lists.css'
import './TeamDetailView.css'

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
          <div className="members">
            <div className="list-title">Members</div>
            <div className="mini-circle-thing">
              <div className="body-initials">AB</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">CD</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">EF</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">HI</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">JK</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">LM</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">NO</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">PQ</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">RS</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">TU</div>
            </div>
            <div className="mini-circle-thing">
              <div className="body-initials">VW</div>
            </div>
            <div className="mini-circle-thing">
            <div className="body-initials">XY</div>
          </div>
            <div className="mini-circle-thing">
              <div className="body-initials">Z</div>
            </div>
          </div>
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