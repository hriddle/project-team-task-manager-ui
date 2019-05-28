import React, {Component} from 'react'
import './TeamDetailView.css'
import Client from "../Client"


class MembersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidMount() {
    Client.fetchMembersInTeam(this.props.teamId,
      members => {
        this.setState({members: members})},
      err => alert(`Unable to get members for team:\n\n${err}`))

  }

  render() {
    let members = "";
    if (this.state.members.length > 0){
      members = this.state.members
        .map(member =>
          <div className="mini-circle-thing">
          <div className="body-initials">{member.firstName.charAt(0).toUpperCase()}{member.lastName.charAt(0).toUpperCase()}</div>
        </div>)
    }

    return (
      <div className="members">
        <div className="list-title">Members</div>
        {members}
      </div>    )
  }
}

export default MembersSection