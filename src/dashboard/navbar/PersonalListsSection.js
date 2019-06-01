import React, {Component} from 'react';
import Client from '../../Client'

class PersonalListsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    Client.fetchPersonalLists(this.props.userId, lists => this.props.setLists(lists));
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