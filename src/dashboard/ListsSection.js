import React, {Component} from 'react';

class ListsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="section team-lists">
        <div className="section-title">Lists</div>
        <div className="section-content">
          {this.props.lists.map((list, index) =>
            <div className="section-row list-name" key={index}>{list.name}</div>
          )}
          <div className="section-row new-list" onClick={this.props.openCreateListModal}>NEW LIST</div>
        </div>
      </div>
    )
  }
}

export default ListsSection