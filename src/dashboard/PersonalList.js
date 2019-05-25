import React, {Component} from 'react';
import './Lists.css';
import AddTask from "./AddTask";
import Task from "./Task";

class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.saveTask = this.saveTask.bind(this);
    this.editTask = this.editTask.bind(this);
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
    fetch(`${process.env.REACT_APP_API_HOST}/lists/${this.props.list.id}/tasks`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(tasks => this.setState({tasks: tasks}))
      .catch(err => alert(`Fetching tasks was unsuccessful:\n\n${err}`));
  }

  saveTask(taskName) {
    return fetch(`${process.env.REACT_APP_API_HOST}/lists/${this.props.list.id}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `{"name": "${taskName}"}`
    }).then(res => res.json())
      .then(tasks => this.setState({tasks: tasks}))
      .catch(err => alert(`Creating task was unsuccessful:\n\n${err}`));
  }

  editTask(taskName, taskIndex) {
    let task = this.state.tasks[taskIndex];
    if (task.name !== taskName) {
      task.name = taskName;
    } else {
      return; // nothing to change
    }
    return fetch(`${process.env.REACT_APP_API_HOST}/lists/${this.props.list.id}/tasks/${taskIndex}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    }).then(res => res.json())
      .then(task => {
        let tasks = this.state.tasks;
        tasks[taskIndex] = task;
        this.setState({tasks: tasks})
      })
      .catch(err => alert(`Editing task was unsuccessful:\n\n${err}`));
  }

  render() {
    return (
      <div id="personal-list">
        <div className="list-container">
          <ul>
            {this.state.tasks.map((task, index) => {
              return <Task task={task} id={index} editTask={this.editTask}/>
            })}
          </ul>
          <AddTask saveTask={this.saveTask}/>
        </div>
      </div>
    )
  }
}

export default PersonalList