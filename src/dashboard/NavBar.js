import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchPersonalLists(this.props.userId);
  }

  fetchPersonalLists(userId) {
    fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/lists`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
      .then(lists => this.props.setPersonalLists(lists))
      .catch(err => alert(`Fetching personal lists was unsuccessful:\n\n${err}`))
  }

  render() {
    let personalLists = [];
    if (this.props.personalLists.length > 0) {
      personalLists = this.props.personalLists.map(list =>
        <div className="list-element" key={list.id}>{list.name}</div>);
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
          <div className="list-title">Teams</div>
          <div className="new-list">NEW LIST</div>
        </div>
      </div>
    )
  }
}

export default NavBar