import React, {Component} from 'react';
import './AllAssignedTasks.css';
import logo from "../../assets/logo-only.svg";

import Client from '../../Client'

class AllAssignedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTaskList: [],
      teams: [],
      taskFetchComplete: false
    };


    this.getTeamNameById = this.getTeamNameById.bind(this);
  }

  componentDidMount() {
    Client.fetchAllAssignedTasksByUser(this.props.userId, listTaskList => {
      this.setState({listTaskList: listTaskList, taskFetchComplete: true})
    });
    Client.fetchAllTeams(teams => this.setState({teams: teams}));
  }

  getTeamNameById(teamId) {
    const team = this.state.teams.find((team) => team.id === teamId);
    return (typeof team !== 'undefined') ? team.name : '';
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

  hasDueDate(task) {
    return task.dueDate !== undefined && task.dueDate !== null;
  }

  render() {
    return (
      <div className="tasks">
        <div className="tasks-container">
          <div className="Assigned-tasks">ASSIGNED TASKS</div>
          <div className="task-divider"/>
          {this.state.taskFetchComplete && (this.state.listTaskList.length > 0 ? (
              <div id="assigned-task-list">
                {this.state.listTaskList.map(taskList => {
                  return taskList.tasks.map(task => {
                    return (
                      <div className="task">
                        <div className="task-info">
                          <div className="task-name">{task.name}</div>
                          <div className="task-origin">{this.getTeamNameById(taskList.ownerId)} > {taskList.name}</div>
                        </div>
                        {this.hasDueDate(task) && (
                          <div className="task-due-date">
                            {this.getFormattedMonth(new Date(task.dueDate))}/{this.getFormattedDayOfMonth(new Date(task.dueDate))}
                          </div>
                        )}
                      </div>
                    )
                  })
                })}
              </div>
            ) : (
              <div className="no-task-message">
                <li>Congratulations, you’re all done!</li>
                <img src={logo} className="logo-only"/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default AllAssignedTasks