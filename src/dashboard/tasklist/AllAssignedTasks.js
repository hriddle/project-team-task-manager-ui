import React, {Component} from 'react';
import DayPicker from "react-day-picker";
import './AllAssignedTasks.css';
import logo from "../../assets/logo-only.svg";

import Client from '../../Client'

class AllAssignedTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTaskList: [],
            teams: []
        };

        this.getTeamNameById = this.getTeamNameById.bind(this);
    }

    componentDidMount() {
        Client.fetchAllTeams(teams => this.setState({teams: teams}));
        Client.fetchAllAssignedTasksByUser(this.props.userId, listTaskList => this.setState({listTaskList: listTaskList}));
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
        let tasks = [];
        if (this.state.listTaskList.length > 0) {
            tasks = this.state.listTaskList.map(taskList => {
                return taskList.tasks.map(task => {
                    return (
                        <li>
                            <div>
                                <li className="task-name">{task.name}</li>
                                <li className="task-details">{this.getTeamNameById(taskList.ownerId)} > {taskList.name}</li>
                            </div>
                            {
                                !this.hasDueDate(task) ? <div className="placeholder"/> : (
                                    <div className="due-day">
                                        {this.getFormattedMonth(new Date(task.dueDate))}/{this.getFormattedDayOfMonth(new Date(task.dueDate))}
                                    </div>
                                )}
                            <div className="task-divider"/>
                        </li>
                    );
                })
            });
        } else {
            tasks = <ul>
                <br/>
                <br/>
                <div className="no-task-message">
                    <li>Congratulations, you’re all done!</li>
                    <img src={logo} className="logo-only"/>
                </div>
            </ul>
        }
        return (
            <div className="tasks">
                <div className="tasks-container">
                    <ul>
                        <li className="Assigned-tasks">ASSIGNED TASKS</li>
                    </ul>
                    <div className="task-divider"/>
                    <ul>
                        {tasks}
                    </ul>
                </div>
            </div>)
    }
}

export default AllAssignedTasks