import React, {Component} from 'react'
import Client from "../../Client"

class MembersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidMount() {
    this.fetchMembers()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.teamId !== this.props.teamId) {
      this.fetchMembers();
    }
  }

  fetchMembers(){
    Client.fetchMembersInTeam(this.props.teamId,
      members => this.setState({members: members}),
      err => alert(`Unable to get members for team:\n\n${err}`))
  }

  render() {
    let members = "";
    if (this.state.members.length > 0){
      members = this.state.members.map(member =>
        <div className="mini-circle-thing" key={member.id}>
          <div className="body-initials">{member.firstName.charAt(0).toUpperCase()}{member.lastName.charAt(0).toUpperCase()}</div>
        </div>
      )
    }

    return (
      <div className="section members">
        <div className="section-title">Members</div>
        <div className="section-content">{members}</div>
      </div>
    )
  }
}

export default MembersSection