import React, {Component} from 'react';
import './Lists.css';
import AddTask from "./AddTask";

class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.saveTask = this.saveTask.bind(this);
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

  render() {
    let tasks = this.state.tasks.map((task, index) => {
      return (
        <li className="task" key={index}>
          <input type="checkbox" />
          <div className="checkbox" />
          <div className="task-name">{task.name}</div>
          <div className="indicators"/>
          <div className="buttons"/>
        </li>
      )
    });
    return (
      <div id="personal-list">
        <div className="list-container">
          <ul>
            {tasks}
          </ul>
          <AddTask saveTask={this.saveTask} />
        </div>
      </div>
    )
  }
}

export default PersonalList