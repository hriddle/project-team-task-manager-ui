import React, {Component} from 'react'

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.beginEditing = this.beginEditing.bind(this);
  }

  beginEditing() {
    this.setState({editing: true, value: this.props.task.name})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editTask(this.state.value, this.props.id);
    this.setState({editing: false, value: ''});
  }

  render() {
    const editing = this.state.editing;
    return (
      <li className="task" key={this.props.id}>
        <input type="checkbox" />
        <div className="checkbox" />
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input className="edit-task field" id="task" name="task" value={this.state.value} onChange={this.handleChange}/>
            <div className="field-buttons">
              <i className="button material-icons save-button" onClick={e => this.handleSubmit(e)}>check</i>
              <i className="button material-icons cancel-button" onClick={() => this.setState({editing: false, value: ''})}>close</i>
            </div>
          </form>
        ) : (
          <div className="task-name" onClick={this.beginEditing}>
            {this.props.task.name}
          </div>
        )}
        <div className="indicators"/>
        {/*<div className="task-buttons"/>*/}
      </li>
    )
  }
}

export default Task