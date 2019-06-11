import React, {Component} from 'react';

const types = {
  LIST: 'list',
  RETRO: 'retrospective',
  POST_MORTEM: 'post-mortem'
};

class ListsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted() {
    this.setState({open: !this.state.open})
  }

  render() {
    let titleLabel = "Lists";
    let newListLabel = "LIST";
    if (this.props.type === types.RETRO) {
      titleLabel = "Retrospectives";
      newListLabel = "RETROSPECTIVE";
    } else if (this.props.type === types.POST_MORTEM) {
      titleLabel = "Post-Mortems";
      newListLabel = "POST-MORTEM";
    }
    const open = this.state.open;
    const icon = open ? "close" : "add";
    return (

    <div className="section team-lists">
      <div className="header">
      <span className="section-title">{titleLabel}</span>
        <i className="button material-icons" onClick={this.toggleCompleted}>{icon}</i>
      </div>
      <div className="section-content">
        {open && this.props.lists.map(list =>
          <div className="section-row list-name" key={list.id} onClick={() => this.props.openList(list.id)}>
            {list.name}
          </div>
        )}
        <div className="section-row new-list" onClick={this.props.openCreateListModal}>NEW {newListLabel}</div>
      </div>
    </div>
  )
  }
}

export default ListsSection