import React, {Component} from 'react'
import save from '../assets/save.svg';
import cancel from '../assets/cancel.svg';
import './AddTask.css'

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: ''
    };
    this.placeholderText = 'Add task...';

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.saveTask(this.state.value);
    this.setState({editing: false, value: ''});
    event.preventDefault();
  }

  render() {
    const editing = this.state.editing;
    return (
      <div className="add-task">
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input className="add-task-line field" id="task" name="task" value={this.state.value} onChange={this.handleChange}/>
            <div className="buttons">
              <input className="button save-button" type="image" src={save} alt="Submit" onClick={e => this.handleSubmit(e)}/>
              <img className="button cancel-button" src={cancel} alt="Cancel" onClick={() => this.setState({editing: false, value: ''})}/>
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