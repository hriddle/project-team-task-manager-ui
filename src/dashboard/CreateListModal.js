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
    if (this.props.name === "List Name") {
      this.submitNewResource(this.state.listName, `/users/${this.props.ownerId}/lists`)
    }
    if(this.props.name === "Team Name"){
      this.submitNewResource(
          JSON.stringify({name: this.state.listName, members: [{id: this.props.ownerId}]})
          ,`/teams`)
    }
  }

  submitNewResource(body, path){
    return fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body.toString()
    }).then(res => res.json())
        .then(list => this.props.addResource(list))
        .then(    this.props.closeModal())
        .catch(err => alert(`Creating list was unsuccessful:\n\n${err}`));
  }

  render() {
    return (
      <div className="create-list-modal">

        <form onSubmit={this.handleSubmit}>
          <div className="field-list-name">
            <label htmlFor="list-name" className="field-label">{this.props.name}</label>
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