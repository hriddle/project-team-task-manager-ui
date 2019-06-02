import React, {Component} from 'react';

class CompletedList extends Component {
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
    const open = this.state.open;
    const addIconClass = "button material-icons" + (open ? " open" : "");
    return (
      <div className="completed-tasks">
        <div className="header">
          <span>Completed Tasks</span>
          <i className={addIconClass} onClick={this.toggleCompleted}>add</i>
        </div>
        { open && (
          <ul>
            { this.props.tasks.map(task => {
              const completedDate = new Date(task.completionDetails.completedDate);
              return <li className="completed-task">
                <div className="name">{task.name}</div>
                <div className="date">{this.getFormattedMonth(completedDate)}/{this.getFormattedDayOfMonth(completedDate)}</div>
                {this.props.showCompletedBy &&
                  <div className="completed-by">{this.props.getFullName(task.completionDetails.completedBy)}</div>
                }
              </li>
            }) }
          </ul>
        )}
      </div>
    )
  }
}

export default CompletedList;