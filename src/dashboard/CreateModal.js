import React, {Component} from "react";
import Client from '../Client'

const types = {
  LIST: 'list',
  TEAM: 'team',
  RETRO: 'retrospective'
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
      Client.createList(this.props.owner.type, this.props.owner.id, {name: this.state.value, listType: "list"},
        list => {
          this.props.addList(list);
          this.props.closeModal();
        }
      );
    } else if (this.props.type === types.TEAM) {
      Client.createTeam({name: this.state.value, members: [{id: this.props.userId}]},
        team => {
          this.props.addTeam(team);
          this.props.closeModal()
        }
      );
    } else if (this.props.type === types.RETRO) {
      Client.createList(this.props.owner.type, this.props.owner.id, {name: this.state.value, listType: "retrospective"},
        team => {
          this.props.addRetro(team);
          this.props.closeModal()
        }
      );
    }
  }

  render() {
    let fieldLabel = "List Name";
    if (this.props.type === types.TEAM) {
      fieldLabel = "Team Name";
    } else if (this.props.type === types.RETRO) {
      fieldLabel = "Retrospective Name";
    }
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