import React, {Component} from "react";
import Client from '../Client'

const types = {
  LIST: 'list',
  TEAM: 'team'
};

class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.type === types.LIST) {
      Client.createList(this.props.owner.type, this.props.owner.id, this.state.value,
        list => {
          this.props.addList(list);
          this.props.closeModal();
        }
      );
    } else if(this.props.type === types.TEAM){
      Client.createTeam({name: this.state.value, members: [{id: this.props.userId}]},
        team => {
          this.props.addTeam(team);
          this.props.closeModal()
        }
      );
    }
  }

  render() {
    let fieldLabel = this.props.type === types.LIST ? "List Name" : "Team Name";
    return (
      <div className="modal-container">
      <div className="create-list-modal">
        <form onSubmit={this.handleSubmit}>
          <div className="field-list-name">
            <label htmlFor="list-name" className="field-label">{fieldLabel}</label>
            <input id="list-name" name="listName" className="field" type="text" value={this.state.value}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="button-row">
            <input className="cancel-button" type="button" value="Cancel" onClick={this.props.closeModal}/>
            <input className="submit-button" type="submit" value="Create"/>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

export default CreateModal