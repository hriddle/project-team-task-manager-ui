import React, {Component} from "react";

class CreateListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({listName: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit(this.state.listName, this.props.ownerId)
  }

  submit(listName, userId) {
    fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}/lists`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: listName
    }).then(res => res.json())
      .then(list => this.props.addNewList(list))
      .catch(err => alert(`Creating list was unsuccessful:\n\n${err}`));
    this.props.closeModal();
  }

  render() {
    return (
      <div className="create-list-modal">
        <form onSubmit={this.handleSubmit}>
          <div className="field-list-name">
            <label htmlFor="list-name" className="field-label">List Name</label>
            <input id="list-name" name="listName" className="field" type="text" value={this.state.listName}
                   onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="button-row">
            <input className="cancel-button" type="button" value="Cancel" onClick={this.props.closeModal}/>
            <input className="submit-button" type="submit" value="Create"/>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateListModal