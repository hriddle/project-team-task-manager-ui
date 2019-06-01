import React, {Component} from 'react';
import './Lists.css';
import AddTask from "./AddTask";
import Task from "./Task";
import Client from "../../Client"
import CompletedList from "./CompletedList";

class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.saveTask = this.saveTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  componentDidMount() {
    this.fetchTasks()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.list.id !== this.props.list.id) {
      this.fetchTasks();
    }
  }

  fetchTasks() {
    Client.fetchTasksInList(this.props.list.id,
      tasks => this.setState({tasks: tasks})
    );
  }

  saveTask(taskName) {
    Client.saveTask(this.props.list.id, {name: taskName},
      tasks => this.setState({tasks: tasks})
    );
  }

  editTask(editedTask, taskIndex) {
    let task = this.state.tasks[taskIndex];
    if (editedTask.name !== undefined) {
      task.name = editedTask.name;
    } else if (editedTask.dueDate !== undefined) {
      if (editedTask.dueDate === '') {
        task.dueDate = null;
      } else {
        task.dueDate = editedTask.dueDate.toJSON();
      }
    } else if (editedTask.completionDetails !== undefined) {
      task.completionDetails = editedTask.completionDetails;
    } else {
      return; // nothing to change
    }
    Client.updateTask(this.props.list.id, taskIndex, task,
      task => {
        let tasks = this.state.tasks;
        tasks[taskIndex] = task;
        this.setState({tasks: tasks})
      }
    )
  }

  deleteTask(taskIndex) {
    Client.deleteTask(this.props.list.id, taskIndex,
      () => {
        let tasks = this.state.tasks;
        tasks.splice(taskIndex, 1);
        this.setState({tasks: tasks});
      }
    )
  }

  completeTask(taskIndex) {
    let completionDetails = {
      completedBy: this.props.userId,
      completedDate: new Date().toJSON()
    };
    this.editTask({completionDetails: completionDetails}, taskIndex);
  }

  render() {
    let completedTasks = this.state.tasks.filter(task => task.completionDetails !== null);
    return (
      <div id="personal-list">
        <div className="list-container">
          <ul>
            {this.state.tasks.map((task, index) => {
              if (task.completionDetails === null) {
                return <Task task={task} id={index} key={index} editTask={this.editTask} deleteTask={this.deleteTask} completeTask={this.completeTask}/>
              }
            })}
          </ul>
          <AddTask saveTask={this.saveTask}/>
          {completedTasks.length > 0 && (
            <CompletedList tasks={completedTasks}/>
          )}
        </div>
      </div>
    )
  }
}

export default PersonalList