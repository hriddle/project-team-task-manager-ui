import React, {Component} from 'react'

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: ''
    };
    this.placeholderText = 'Add task...';

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveTask(this.state.value);
    this.setState({editing: false, value: ''});
  }

  render() {
    const editing = this.state.editing;
    return (
      <div className="add-task">
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input className="add-task-line field" id="task" name="task" value={this.state.value} onChange={this.handleChange}/>
            <div className="buttons">
              <i className="button material-icons save-button" onClick={e => this.handleSubmit(e)}>check</i>
              <i className="button material-icons cancel-button" onClick={() => this.setState({editing: false, value: ''})}>close</i>
            </div>
          </form>
        ) : (
          <div className="add-task-line placeholder" onClick={() => {this.setState({editing: true})}}>
            {this.placeholderText}
          </div>
        )}
      </div>
    )
  }
}

export default AddTask