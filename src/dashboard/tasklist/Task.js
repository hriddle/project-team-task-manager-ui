import React, {Component} from 'react'
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import './DayPickerOverrides.css'

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: '',
      editingDueDate: false,
      editingAssignedUser: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.beginEditing = this.beginEditing.bind(this);
    this.beginEditingDueDate = this.beginEditingDueDate.bind(this);
    this.submitDueDateChange = this.submitDueDateChange.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.beginEditingAssignedUser = this.beginEditingAssignedUser.bind(this);
    this.submitAssignedUserChange = this.submitAssignedUserChange.bind(this);
    this.closeMemberPicker = this.closeMemberPicker.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
  }

  beginEditing() {
    this.setState({editing: true, value: this.props.task.name})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editTask({name: this.state.value}, this.props.id);
    this.setState({editing: false, value: ''});
  }

  handleDelete() {
    this.props.deleteTask(this.props.id);
  }

  beginEditingDueDate() {
    this.setState({editingDueDate: true})
  }

  submitDueDateChange(day) {
    this.closeCalendar();
    this.props.editTask({dueDate: day}, this.props.id);
  }

  closeCalendar() {
    this.setState({ editingDueDate: false });
  }

  beginEditingAssignedUser() {
    this.setState({editingAssignedUser: true})
  }

  submitAssignedUserChange(id) {
    this.closeMemberPicker();
    this.props.editTask({assignedUser: id}, this.props.id);
  }

  closeMemberPicker() {
    this.setState({editingAssignedUser: false})
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

  handleClickCheckbox() {
    this.props.completeTask(this.props.id);
  }

  findUserById(userId) {
    return this.props.members.find(member => member.id === userId);
  }

  formatUserInitials(user) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  render() {
    const editing = this.state.editing;
    const editingDueDate = this.state.editingDueDate;
    const editingAssignedUser = this.state.editingAssignedUser;
    const isTeamList = this.props.isTeamList;
    const hasDueDate = this.props.task.dueDate !== undefined && this.props.task.dueDate !== null;
    const dueDate = hasDueDate ? new Date(this.props.task.dueDate) : undefined;
    const isAssigned = this.props.task.assignedUser !== undefined && this.props.task.assignedUser !== null;
    const assignedUserInitials = isAssigned ? this.formatUserInitials(this.findUserById(this.props.task.assignedUser)) : undefined;
    const checkboxClass = this.props.task.completionDetails !== null ? "checkbox completed" : "checkbox";

    return (
      <li className="task" key={this.props.id}>
        <input type="checkbox" />
        <div className={checkboxClass} onClick={this.handleClickCheckbox} />
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
            <div className="due-date" onClick={this.beginEditingDueDate}>
              <div className="month">{this.getFormattedMonth(dueDate)}</div>
              <div className="day">{this.getFormattedDayOfMonth(dueDate)}</div>
            </div>
            )}
          {isTeamList && (!isAssigned ? <div className="placeholder"/> : (
            <div className="assignment" onClick={this.beginEditingAssignedUser}>{assignedUserInitials}</div>
          ))}
        </div>
        <div className="task-buttons">
          <i className="button material-icons" onClick={this.handleDelete}>delete</i>
          <i className="button material-icons" onClick={this.beginEditing}>edit</i>
          {hasDueDate ? (<div className="placeholder" onClick={this.beginEditingDueDate}/>) : (
            <i className="button material-icons" onClick={this.beginEditingDueDate}>calendar_today</i>
          )}
          {isTeamList && (isAssigned ? (<div className="placeholder" onClick={this.beginEditingAssignedUser}/>) : (
            <i className="button material-icons" onClick={this.beginEditingAssignedUser}>person</i>
          ))}
        </div>
        {editingDueDate &&
          <Calendar close={this.closeCalendar} submit={this.submitDueDateChange}
                    dueDate={new Date(this.props.task.dueDate)}/>
        }
        {editingAssignedUser &&
          <MemberPicker close={this.closeMemberPicker} submit={this.submitAssignedUserChange}
                        members={this.props.members} assignedUser={this.props.task.assignedUser}/>
        }
      </li>
    )
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.clearDueDate = this.clearDueDate.bind(this);
  }

  handleDayClick(day) {
    this.props.submit(day);
  }

  clearDueDate() {
    this.props.submit('');
  }

  render() {
    return (
      <div className="calendar">
        <DayPicker onDayClick={this.handleDayClick} selectedDays={this.props.dueDate}/>
        <div className="buttons">
          <div className="close" onClick={this.props.close}>Close</div>
          <div className="clear-date" onClick={this.clearDueDate}>Clear</div>
        </div>
      </div>
    )
  }
}

class MemberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatUserInitials(user) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  render() {
    return (
      <div className="member-picker">
        <ul>
          {this.props.members.map(member => {
            return (
              <li className={member.id === this.props.assignedUser ? "selected" : ""} key={member.id}
                  onClick={() => this.props.submit(member.id)}>
                <div className="initials">{this.formatUserInitials(member)}</div>
                <div className="name">{member.firstName} {member.lastName}</div>
              </li>
            )
          })}
        </ul>
        <div className="buttons">
          <div className="close" onClick={this.props.close}>Close</div>
          <div className="clear-date" onClick={() =>this.props.submit('')}>Clear</div>
        </div>
      </div>
    )
  }
}

export default Task