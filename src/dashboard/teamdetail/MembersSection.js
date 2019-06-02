import React, {Component} from 'react'

class MembersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let members = "";
    if (this.props.members.length > 0){
      members = this.props.members.map(member =>
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