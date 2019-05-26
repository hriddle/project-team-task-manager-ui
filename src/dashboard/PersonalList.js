import React, {Component} from 'react';
import './Lists.css';
import AddTask from "./AddTask";
import Task from "./Task";
import Client from "../Client"

class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.saveTask = this.saveTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
      tasks => this.setState({tasks: tasks}),
      err => alert(`Fetching tasks was unsuccessful:\n\n${err}`)
    );
  }

  saveTask(taskName) {
    Client.saveTask(this.props.list.id, {name: taskName},
      tasks => this.setState({tasks: tasks}),
      err => alert(`Creating task was unsuccessful:\n\n${err}`)
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
    } else {
      return; // nothing to change
    }
    Client.updateTask(this.props.list.id, taskIndex, task,
      task => {
        let tasks = this.state.tasks;
        tasks[taskIndex] = task;
        this.setState({tasks: tasks})
      },
      err => alert(`Editing task was unsuccessful:\n\n${err}`))
  }

  deleteTask(taskIndex) {
    Client.deleteTask(this.props.list.id, taskIndex,
      () => {
        let tasks = this.state.tasks;
        tasks.splice(taskIndex, 1);
        this.setState({tasks: tasks});
      },
      err => alert(`Deleting task was unsuccessful:\n\n${err}`))
  }

  render() {
    return (
      <div id="personal-list">
        <div className="list-container">
          <ul>
            {this.state.tasks.map((task, index) => {
              return <Task task={task} id={index} key={index} editTask={this.editTask} deleteTask={this.deleteTask}/>
            })}
          </ul>
          <AddTask saveTask={this.saveTask}/>
        </div>
      </div>
    )
  }
}

export default PersonalList