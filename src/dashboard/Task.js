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
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    this.props.deleteTask(this.props.id);
  }

  getFormattedMonth(date) {
    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return mm;
  }

  getFormattedDayOfMonth(date) {
    let dd = date.getDate();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    return dd;
  }

  render() {
    const editing = this.state.editing;
    const hasDueDate = this.props.task.dueDate !== null;
    const dueDate = new Date(this.props.task.dueDate);
    return (
      <li className="task" key={this.props.id}>
        <input type="checkbox" />
        <div className="checkbox" />
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input className="edit-task field" id="task" name="task" value={this.state.value} onChange={this.handleChange}/>
            <div className="field-buttons">
              <i className="button material-icons" onClick={e => this.handleSubmit(e)}>check</i>
              <i className="button material-icons" onClick={() => this.setState({editing: false, value: ''})}>close</i>
            </div>
          </form>
        ) : (
          <div className="task-name" onClick={this.beginEditing}>
            {this.props.task.name}
          </div>
        )}
        <div className="indicators">
          {!hasDueDate ? <div className="placeholder"/> : (
            <div className="due-date">
              <div className="month">{this.getFormattedMonth(dueDate)}</div>
              <div className="day">{this.getFormattedDayOfMonth(dueDate)}</div>
            </div>
            )}
          <div className="placeholder"/>
        </div>
        <div className="task-buttons">
          <i className="button material-icons" onClick={this.handleDelete}>delete</i>
          <i className="button material-icons" onClick={this.beginEditing}>edit</i>
          {hasDueDate ? (
            <div className="placeholder"/>
          ) : (
            <i className="button material-icons">calendar_today</i>
          )}
            <div className="placeholder"/>
        </div>
      </li>
    )
  }
}

export default Task