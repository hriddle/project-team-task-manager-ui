import React, {Component} from 'react';

class PersonalListsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.fetchPersonalLists(this.props.userId);
  }

  fetchPersonalLists(userId) {
    fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/lists`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(lists => this.props.setLists(lists))
      .catch(err => alert(`Fetching personal lists was unsuccessful:\n\n${err}`))
  }

  render() {
    let personalLists = [];
    if (this.props.lists.length > 0) {
      personalLists = this.props.lists.map(list =>
        <div className="list-element" key={list.id} onClick={() => this.props.openList(list.id)}>{list.name}</div>);
    }

    return (
      <div className="list">
        <div className="list-title">Personal Lists</div>
        {personalLists}
        <div className="new-list" onClick={this.props.openCreateListModal}>NEW LIST</div>
      </div>
    )
  }
}

export default PersonalListsSection